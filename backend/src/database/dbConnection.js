import { Sequelize } from "sequelize";
import { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_DIALECT } from "../config.js";


export const dbConnection = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: DB_DIALECT,
        logging: true,
    }

);