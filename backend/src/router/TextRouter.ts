import BaseRoutes from "./base/BaseRouter";
import validate from "../helper/validate";
import TextController from "../controller/TextController";
import { createTextSchema, updateTextSchema, deleteTextSchema, getTextByIdSchema } from "../schema/TextSchema";
import { authenticationToken } from "../middleware/ProtectRoute";

class TextRoutes extends BaseRoutes {
    public routes(): void {
        // Route for creating a new text (protected route)
        this.router.post("/create", authenticationToken, validate(createTextSchema) as any, TextController.createText);

        // Route for updating an existing text (protected route)
        this.router.patch("/update/:textId", authenticationToken, validate(updateTextSchema) as any, TextController.updateText);

        // Route for deleting a text (protected route)
        this.router.delete("/delete/:textId", authenticationToken, validate(deleteTextSchema) as any, TextController.deleteText);

        // Route for retrieving a text by ID (protected route)
        this.router.get("/get/:textId", authenticationToken, validate(getTextByIdSchema) as any, TextController.getTextById);

        // Route for retrieving all texts by a user (protected route)
        this.router.get("/user-texts", authenticationToken, TextController.getTextsByUserId);
    }
}

export default new TextRoutes().router;
