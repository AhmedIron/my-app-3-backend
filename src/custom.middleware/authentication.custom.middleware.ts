import { Request, Response, NextFunction } from "express";
//calling JSON Web Token (JWT)
import jwt from "jsonwebtoken";
//require Config to use the TOKEN
import config from "../config";

//handling (Request, Response, next) between model and route
const TokenRequired = (req: Request, res: Response, next: NextFunction) => {
  try {
    //holding the authorization from Request-Headers
    const authorizationHeader = req.headers.authorization as string;
    //holding the second string [1]
    const token = authorizationHeader.split(" ")[1];
    //use verify() and pass to it TOKEN & TOKEN-SECRET from config file
    jwt.verify(token, config.tokenSecret as string);
    //if everything going fine , then use next() to allow the route to run
    next();
    //if something went wrong then Respond with error
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};
//export the middleware to use it with routes
export default TokenRequired;
