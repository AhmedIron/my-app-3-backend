import { Request, Response } from "express";
import { FoodUsers } from "../models/users.models";
import jwt from "jsonwebtoken";
import config from "../config";

const classUser = new FoodUsers();

export const sign_Up = async (req: Request, res: Response) => {
    console.log(req.body);
    
  try {
    const user = await classUser.signUp(req.body);
    res.json({
      message: "the USER has been created",
      data: user,
    });
  } catch (error) {
    throw new Error(`Could not create USER. Error: ${error}`);
  }
};

export const indexUsers = async (_req: Request, res: Response) => {
  try {
    const users = await classUser.index();
    res.json({
      message: "All USERS Index",
      data: users,
    });
  } catch (error) {
    throw new Error(`Could not find USERS. Error: ${error}`);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const user_name = await req.body.user_name;
    const password = await req.body.password;
    const user = await classUser.logIn(user_name, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    console.log(user);
    if (user) {
      return res.json({
        message: "User Signed-In successfully",
        data: { user, token },
      });
      
    } else {
      return res.status(401).json({
        message: "wrong name Or password",
      });
    }
  } catch (error) {
    throw new Error(`Could not Erase the USER. Error: ${error}`);
  }
};
