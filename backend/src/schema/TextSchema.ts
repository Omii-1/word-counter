import { z } from "zod";

// Schema for creating a new text
export const createTextSchema = z.object({
    body: z.object({
        title: z.string().min(3, { message: "Title must be greater than 3 characters!" }),
        description: z.string().min(10, { message: "Description must be greater than 10 characters!" })
    })
});

// Schema for updating an existing text
export const updateTextSchema = z.object({
    params: z.object({
        textId: z.string().regex(/^\d+$/, "textId must be a valid number").transform(Number)
    }),
    body: z.object({
        newTitle: z.string().min(1, { message: "Title is required" }),
        newDescription: z.string().optional()
    })
});

// Schema for deleting a text
export const deleteTextSchema = z.object({
    params: z.object({
        textId: z.string().regex(/^\d+$/, "textId must be a valid number").transform(Number)
    }),
});

// Schema for retrieving a text by ID
export const getTextByIdSchema = z.object({
    params: z.object({
        textId: z.string().regex(/^\d+$/, "textId must be a valid number").transform(Number)
    }),
});
