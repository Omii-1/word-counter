import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv"

import { User } from "../model/User";
import { Text } from "../model/Text";

dotenv.config()

class Database {
    public sequelize: Sequelize | undefined

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as unknown as string;

    constructor() {
        this.connectToPostgreSQL()
    }

    private async connectToPostgreSQL(){
        this.sequelize = new Sequelize( {
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            models: [User, Text],

        })

        await this.sequelize.authenticate().then(() => {
            console.log("PostgreSQL Connection has been established successfully.");      
        }).catch((err) => {
            console.log("Unable to connect to the postgreSQL database.", err)
        })
    }
}

export default Database