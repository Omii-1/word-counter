import express, { Application, Request, Response } from "express"
import Database from "./config/database";
import UserRouter from "./router/UserRouter";
import TextRouter from "./router/TextRouter";

class App {
    public app: Application;

    constructor() {
        this.app = express()
        this.plugins()
        this.databaseSync()
        this.routes()
    }

    protected plugins(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    protected databaseSync(): void {
        const db = new Database()
        db.sequelize?.sync({ alter: true }).then(() => {
            console.log("Database synced successfully!");
        }).catch((err) => {
            console.log("Error syncing database:", err);
        });
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("welcome home")
        })
        this.app.use("/api/v1/user", UserRouter)
        this.app.use("/api/v1/text", TextRouter)

    }
}

const port: number = 8000
const app = new App().app

app.listen(port, () => {
    console.log("Server started successfully!");

})