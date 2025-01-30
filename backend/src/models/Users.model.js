import { dbConnection } from "../database/dbConnection.js";
import { DataTypes } from "sequelize";

export const User = dbConnection.define(
    "usuarios",
    {
        id : {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre : {
            type : DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "El nombre es requerido"
                },
                len : {
                    args: [3, 60],
                    msg: "El nombre debe tener entre 3 y 60 caracteres"
                },
                isAlpha: {
                    args: true,
                    msg: "El nombre solo puede contener letras"
                },
                notNull: {
                    args: true,
                    msg: "El nombre de usuario es requerido"
                }
            }
        },
        apellido : {
            type : DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "El apellido es requerido"
                },
                len : {
                    args: [3, 60],
                    msg: "El apellido debe tener entre 3 y 60 caracteres"
                },
                notNull: {
                    args: true,
                    msg: "El apellido es requerido"
                },
                isAlpha: {
                    args: true,
                    msg: "El apellido solo puede contener letras"
                }
            }
        },
        email : {
            type : DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "El email ya está en uso"
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: "El email no es válido"
                },
                notEmpty: {
                    args: true,
                    msg: "El email es requerido"
                }               
            }
        },
        estado : {
            type : DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
            validate: {
                isIn: {
                    args: [[0, 1]],
                    msg: "El estado solo puede ser 0 (inactivo) o 1 (activo)"
                },
                notNull: {
                    args: true,
                    msg: "El estado es requerido"
                },
                isInt: {
                    args: true,
                    msg: "El estado debe ser un número entero"
                }
            }
        }
    },
    {
        timestamps: false,
        tableName: "usuarios"
    }
);