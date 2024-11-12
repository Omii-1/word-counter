import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate = (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log('Incoming request body:', req.body); // Debug log
            await schema.parseAsync({
                params: req.params,
                body: req.body
            });
            next();
        } catch (error) {
            console.log('Validation Error:', error); // Debug log
            if (error instanceof ZodError) {
                res.status(400).json({
                    status: "Bad Request!",
                    message: error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            } else {
                res.status(400).json({
                    status: "Bad Request!",
                    message: "Invalid request data"
                });
            }
        }
    };

export default validate;