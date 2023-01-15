"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//calling JSON Web Token (JWT)
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//require Config to use the TOKEN
const config_1 = __importDefault(require("../config"));
//handling (Request, Response, next) between model and route
const TokenRequired = (req, res, next) => {
    try {
        //holding the authorization from Request-Headers
        const authorizationHeader = req.headers.authorization;
        //holding the second string [1]
        const token = authorizationHeader.split(" ")[1];
        //use verify() and pass to it TOKEN & TOKEN-SECRET from config file
        jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
        //if everything going fine , then use next() to allow the route to run
        next();
        //if something went wrong then Respond with error
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
};
//export the middleware to use it with routes
exports.default = TokenRequired;
