import BaseRoutes from "./base/BaseRouter";
import validate from "../helper/validate";
import UserController from "../controller/UserController";
import { signupSchema, signinSchema, updatePasswordSchema } from "../schema/UserSchema";
import { authenticationToken } from "../middleware/ProtectRoute";

class UserRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post("/signup", validate(signupSchema) as any, UserController.signup);
        this.router.post("/signin", validate(signinSchema) as any, UserController.signin);
        
        // Protect this route with authentication middleware
        this.router.patch("/update-password ", authenticationToken, validate(updatePasswordSchema) as any, UserController.changePassword);

        // Retrieve user with their texts by userId
        this.router.get("/get-user", authenticationToken, UserController.getUserWithTexts);

        // Delete user by userId and also delete the associated texts
        this.router.delete("/delete-user", authenticationToken, UserController.deleteUser);

        // Route for admin to get all users and their texts (protected route)
        this.router.get("/all-users-with-texts", authenticationToken, UserController.getAllUsersWithTexts);
    }
}

export default new UserRoutes().router;
