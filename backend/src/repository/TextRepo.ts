import { Text } from "../model/Text";

interface ITextRepo {
    saveText(text: Text): Promise<Text>;
    updateText(textId: number, newTitle: string, newDescription: string): Promise<void>;
    deleteText(textId: number): Promise<void>;
    retrieveTextById(textId: number): Promise<Text | null>;
    retrieveTextsByUserId(userId: number): Promise<Text[]>;
    retrieveTextByTitleAndUserId(title: string, userId: number): Promise<Text | null>;
}

export class TextRepo implements ITextRepo {

    async saveText(text: Text): Promise<Text> {
        try {
            const savedText = await Text.create({
                userId: text.userId,
                title: text.title,
                description: text.description
            })
            return savedText
        } catch (error) {
            console.error("Error saving Text: ", error)
            throw new Error("Failed to save text!")
        }
    }

    async retrieveTextByTitleAndUserId(title: string, userId: number): Promise<Text | null> {
        return await Text.findOne({
            where: {
                title: title,
                userId: userId
            }
        });
    }

    async updateText(textId: number, newTitle: string, newDescription: string): Promise<void> {
        try {
            const text = await Text.findByPk(textId);
            if(!text) {
                throw new Error("Text not found")
            }

            text.title = newTitle
            text.description = newDescription
            await text.save()
        } catch(error) {
            console.error("Error updating text: ", error)
            throw new Error("Failed to update text!")
        }
    }

    async deleteText(textId: number): Promise<void> {
        try {
            const text = await Text.findByPk(textId)
            if(!text) {
                throw new Error("Text not found")
            }
            await text.destroy()
        } catch(error) {
            console.error("Error deleting text: ", error)
            throw new Error("Failed to delete text1")
        }
    }

    async retrieveTextById(textId: number): Promise<Text | null> {
        try {
            return await Text.findByPk(textId)
        } catch (error) {
            console.error("Error retrieving text by ID: ", error)
            throw new Error("Failed to retrieve text by ID!")
        }
    }

    async retrieveTextsByUserId(userId: number): Promise<Text[]> {
        try {
            return await Text.findAll({ where: { userId } })
        } catch (error) {
            console.error("Error retrieving texts by user ID: ", error)
            throw new Error("Failed to retrieve texts by user ID!")
        }
    }
}