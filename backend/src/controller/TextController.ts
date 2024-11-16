import { NextFunction, Request, Response } from "express";
import { Text } from "../model/Text";
import { User } from "../model/User";
import { TextRepo } from "../repository/TextRepo";
import { UserRepo } from "../repository/UserRepo";

class TextController {

    // create a new text
    async createText(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, description } = req.body;
            const existingUser = (req as any).user
            const userId = existingUser.id

            // Check if the user already has a text with the same title
            const textRepo = new TextRepo();
            const existingText = await textRepo.retrieveTextByTitleAndUserId(title, userId);

            if (existingText) {
                res.status(400).json({
                    status: "error",
                    message: "A text with this title already exists. Please choose a different title."
                })
                return
            }

            const text = new Text();
            text.userId = userId
            text.title = title
            text.description = description

            const newText: Text = await textRepo.saveText(text)

            // add text ID to the user's texts array
            const userRepo = new UserRepo()
            const user = await userRepo.retrieveById(userId)
            if (!user) {
                res.status(404).json({
                    status: "error",
                    message: "User not found"
                })
                return
            }

            user.texts = user.texts ? [...user.texts, newText.id] : [newText.id]
            await user.save()

            res.status(201).json({
                status: "success",
                message: "Text created successfully",
                textId: newText.id
            })
        } catch (err) {
            res.status(500).json({
                status: "Error",
                message: "Internal server error!"
            })
        }
    }

    // update an existing text
    async updateText(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const textId = parseInt(req.params.textId);
            const { newTitle, newDescription } = req.body

            const textRepo = new TextRepo()
            await textRepo.updateText(textId, newTitle, newDescription)

            res.status(200).json({
                status: "success",
                message: "Text updated successfully"
            })
        } catch (err: any) {
            res.status(500).json({
                status: "Error",
                message: err.message || "Internal Server Error!"
            })
        }
    }

    // Delete a text
    async deleteText(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const textId = parseInt(req.params.textId);

            const textRepo = new TextRepo();
            const textToDelete = await textRepo.retrieveTextById(textId)

            if (!textToDelete) {
                res.status(404).json({
                    status: "error",
                    message: "Text not found"
                })
                return;
            }

            // retrieve the user who owns the text
            const userRepo = new UserRepo();
            const user = await userRepo.retrieveById(textToDelete.userId)

            if (user) {
                // remove he text id from the user's texts array
                user.texts = user.texts.filter(id => id !== textId);
                await user.save();
            }

            // delete the text
            await textRepo.deleteText(textId);

            res.status(200).json({
                status: "success",
                message: "Text deleted successfully"
            })
        } catch (err: any) {
            res.status(500).json({
                status: "Error",
                message: err.message || "Internal server error!"
            })
        }
    }

    // Retrieve text by ID
    async getTextById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const textId = parseInt(req.params.textId)

            const textRepo = new TextRepo()
            const text = await textRepo.retrieveTextById(textId)

            if (!text) {
                res.status(404).json({
                    status: "error",
                    message: "Text not found!"
                })
                return;
            }

            res.status(200).json({
                status: "success",
                text: text
            })
        } catch (err: any) {
            res.status(500).json({
                status: "Error",
                message: err.message || "Internal server error"
            })
        }
    }

    // Retrieve all texts for a user
    async getTextsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {userId} = req.params
            console.log("Received userId:", userId, typeof(userId)); 

            if (isNaN(parseInt(userId))) {
                res.status(400).json({
                    status: "error",
                    message: "Invalid user ID provided",
                });
                return;
            }

            const textRepo = new TextRepo()
            const texts = await textRepo.retrieveTextsByUserId(parseInt(userId))

            res.status(200).json({
                status: "success",
                texts: texts
            })
        } catch (err: any) {
            res.status(500).json({
                status: "Error",
                message: err.message || "Internal Server Error"
            })
        }
    }
}

export default new TextController();