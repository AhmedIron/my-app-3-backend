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
exports.signIn = exports.indexUsers = exports.sign_Up = void 0;
const users_models_1 = require("../models/users.models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const classUser = new users_models_1.FoodUsers();
const sign_Up = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const user = yield classUser.signUp(req.body);
        res.json({
            message: "the USER has been created",
            data: user,
        });
    }
    catch (error) {
        throw new Error(`Could not create USER. Error: ${error}`);
    }
});
exports.sign_Up = sign_Up;
const indexUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield classUser.index();
        res.json({
            message: "All USERS Index",
            data: users,
        });
    }
    catch (error) {
        throw new Error(`Could not find USERS. Error: ${error}`);
    }
});
exports.indexUsers = indexUsers;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_name = yield req.body.user_name;
        const password = yield req.body.password;
        const user = yield classUser.logIn(user_name, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        console.log(user);
        if (user) {
            return res.json({
                message: "User Signed-In successfully",
                data: { user, token },
            });
        }
        else {
            return res.status(401).json({
                message: "wrong name Or password",
            });
        }
    }
    catch (error) {
        throw new Error(`Could not Erase the USER. Error: ${error}`);
    }
});
exports.signIn = signIn;
