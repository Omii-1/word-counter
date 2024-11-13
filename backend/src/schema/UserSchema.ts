import { z } from "zod"

// signup schema
export const signupSchema = z.object({
    body: z.object({
        userName: z.string().min(4, { message : "UserName must be greater than 4 characters!"}),
        email: z.string().email({message: "Please enter valid Email!"}),
        password: z.string().min(6, { message: "Password must be greater than 6 characters"})    
    })
});
 
// signin schema
export const signinSchema = z.object({
    body: z.object({
        email: z.string().email({message: "Please enter valid Email!"}),
        password: z.string().min(6, { message: "Password must be greater than 6 characters"})     
    })
});

// update password schema
export const updatePasswordSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(6, { message: "Password must be greater than 6 characters"}),
        newPassword: z.string().min(6, { message: "Password must be greater than 6 characters"})    
    })
});