import { NextFunction, Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"


import { User } from "../model/User"
import { Text } from "../model/Text";
import { UserRepo } from "../repository/UserRepo";
import { TextRepo } from "../repository/TextRepo";

dotenv.config()

class UserController {

    // user signup
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { userName, email, password } = req.body;

            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                res.status(400).json({
                    msg: "User already exists.",
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = new User();
            user.userName = userName
            user.email = email
            user.password = hashedPassword

            const newUser = await new UserRepo().save(user);

            // Generate JWT token

            const token = jwt.sign(
                { id: newUser.id, role: newUser.role },
                process.env.JWT_SECRET as string, { expiresIn: "30d" }
            )

            res.status(200).json({
                status: "success",
                message: "User Created Successfully!",
                id: newUser.id,
                role: newUser.role,
                token: `Bearer ${token}`
            })

        } catch (err) {
            res.status(500).json({
                status: "Error",
                message: "Internal Server Error!"
            })
        }
    }

    // user signin
    async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            const existingUser = await User.findOne({ where: { email } });

            if (!existingUser) {
                res.status(411).json({
                    msg: "User Not Present.",
                });
                return;
            }

            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (!passwordMatch) {
                res.status(400).json({
                    msg: "Incorrect password.",
                });
                return
            }

            // Generate JWT token

            const token = jwt.sign(
                { id: existingUser.id, role: existingUser.role },
                process.env.JWT_SECRET!,
                { expiresIn: "30d" }
            );

            res.status(200).json({
                status: "success",
                message: "User Logged Successfully!",
                id: existingUser.id,
                role: existingUser.role,
                token: `Bearer ${token}`
            })

        } catch (err) {
            res.status(500).json({
                status: "Error",
                message: "Internal Server Error!"
            })
        }
    }

    // user change password
    async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const existingUser = (req as any).user
            const userId = existingUser.id
            const { oldPassword, newPassword } = req.body;

            const userRepo = new UserRepo();
            await userRepo.updatePassword(userId, oldPassword, newPassword);

            res.status(200).json({
                status: "success",
                message: "Password updated successfully"
            });

        } catch (err: any) {
            res.status(500).json({
                status: "Error",
                message: err.message || "Internal Server Error!"
            })
        }
    }

    // retrieve user with his id and populate the texts
    async getUserWithTexts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const existingUser = (req as any).user
            const userId = existingUser.id

            // Get user by ID and populate texts
            const userRepo = new UserRepo();
            const userWithTexts = await userRepo.retrieveById(parseInt(userId));

            if (!userWithTexts) {
                res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
                return;
            }

            res.status(200).json({
                status: "success",
                data: userWithTexts
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    }


    // delete the user with Userid and also delete texts which he created
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const existingUser = (req as any).user
            const userId = existingUser.id

            const userRepo = new UserRepo();
            await userRepo.delete(parseInt(userId));

            res.status(200).json({
                status: "success",
                message: "User and associated texts deleted successfully"
            });
        } catch (err: any) {
            res.status(500).json({
                status: "error",
                message: err.message || "Internal server error"
            });
        }
    }

    // retrieve all users and their populated texts
    async getAllUsersWithTexts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Check if the current user is an admin
            const currentUser = (req as any).user;
            if (currentUser.role !== 'admin') {
                res.status(403).json({
                    status: "error",
                    message: "Access denied. Admins only."
                });
                return;
            }

            const userRepo = new UserRepo();
            const usersWithTexts = await userRepo.retrieveAll();

            res.status(200).json({
                status: "success",
                data: usersWithTexts
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    }
}

export default new UserController();