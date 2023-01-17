"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, NODE_ENV, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_test, POSTGRES_USER, POSTGRES_Password, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET, SSL, URL } = process.env;
exports.default = {
    port: PORT,
    host: POSTGRES_HOST,
    db_port: POSTGRES_PORT,
    user: POSTGRES_USER,
    password: POSTGRES_Password,
    database: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_test,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
    ssl: SSL
};
