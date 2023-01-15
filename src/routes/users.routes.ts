import { Router } from "express";
import * as userRoutes from "../handler/users.handler";
//import TokenRequired custom middleware to protect the Routes
import TokenRequired from "../custom.middleware/authentication.custom.middleware";

//holding Router() and saved it as userRoute so we can use
const userRoute = Router();

userRoute.post("/signup", userRoutes.sign_Up);
userRoute.get("/", userRoutes.indexUsers);
userRoute.post("/login", userRoutes.signIn);


export default userRoute;