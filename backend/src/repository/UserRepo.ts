import { User } from "../model/User";
import { Text } from "../model/Text"

import bcrypt from "bcryptjs"

interface IUserRepo {
    save(user: User): Promise<User>;
    updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<void>;
    delete(userId: number): Promise<void>;
    retrieveById(userId: number): Promise<User | null>;
    retrieveAll(): Promise<User[]>;
}

export class UserRepo implements IUserRepo {

    // create or save new user
    async save(user: User): Promise<User> {
        try {
            const savedUser =await User.create({
                userName: user.userName,
                email: user.email,
                password: user.password,
                role: user.role,
                text: user.texts
            });
            return savedUser
        } catch (err) {
            console.error("Error creating user:", err);
            throw new Error("Failed to create User!");
        }
    }

    // update user password
    async updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
        try {
            const existingUser = await User.findByPk(userId);
            if (!existingUser) {
                throw new Error("User not found");
            }

            // Check if old password matches
            const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);
            if (!isPasswordValid) {
                throw new Error("Old password is incorrect");
            }

            // Check if new password is same as old password
            if (oldPassword === newPassword) {
                throw new Error("New password must be different from the old password");
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            existingUser.password = hashedPassword;
            await existingUser.save();
        } catch (err) {
            console.error("Error updating password:", err);
            throw new Error("Failed to update password!");
        }
    }

    // Delete user and associated texts by user ID
    async delete(userId: number): Promise<void> {
        try {
            const existingUser = await User.findByPk(userId, {
                include: [{
                    model: Text,
                    as: 'textsList'
                }]
            });

            if (!existingUser) {
                throw new Error("User not found");
            }

            // Delete all associated texts
            await Text.destroy({
                where: {
                    userId: userId
                }
            });

            // Now delete the user
            await existingUser.destroy();
        } catch (err) {
            console.error("Error deleting user:", err);
            throw new Error("Failed to delete User!");
        }
    }

    // Retrieve user by ID and populate texts
    async retrieveById(userId: number): Promise<User | null> {
        try {
            const existingUser = await User.findByPk(userId, {
                include: [{
                    model: Text,
                    as: 'textsList' // Make sure this alias matches the association
                }]
            });
            if (!existingUser) {
                throw new Error("User not found");
            }
            return existingUser;
        } catch (err) {
            console.error("Error retrieving user:", err);
            throw new Error("Failed to retrieve User!");
        }
    }

    // retrieve all users
    async retrieveAll(): Promise<User[]> {
        try {
            const existingUsers = await User.findAll({
                include: [{
                    model: Text,
                    as: 'textsList'
                }]
            });
            return existingUsers;
        } catch (err) {
            console.error("Error retrieving all users:", err);
            throw new Error("Failed to retrieve all Users!");
        }
    }
}
