"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodUsers = void 0;
const index_1 = __importDefault(require("../database/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
class FoodUsers {
    logIn(user_name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield index_1.default.connect();
                const sql = `SELECT user_name, password FROM users WHERE user_name=$1`;
                const result = yield con.query(sql, [user_name]);
                if (result.rows.length) {
                    const user = yield result.rows[0];
                    if (bcrypt_1.default.compareSync(password + config_1.default.pepper, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error(`Could not create user. Error: ${error}`);
            }
        });
    }
    signUp(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO users (user_name, password) 
            VALUES ($1, $2) RETURNING *`;
                const hashedPassword = bcrypt_1.default.hashSync(u.password + config_1.default.pepper, parseInt(config_1.default.salt));
                const result = yield connection.query(sql, [
                    u.user_name,
                    hashedPassword,
                ]);
                const user = yield result.rows[0];
                connection.release();
                return user;
            }
            catch (error) {
                throw new Error(`Could not create user. Error: ${error}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield index_1.default.connect();
                const sql = `SELECT id, user_name, password FROM users`;
                const result = yield con.query(sql);
                const Users = result.rows;
                con.release();
                return Users;
            }
            catch (error) {
                throw new Error(`Could not get all users. Error: ${error}`);
            }
        });
    }
}
exports.FoodUsers = FoodUsers;
exports.default = FoodUsers;
