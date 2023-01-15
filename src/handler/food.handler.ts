import { Request, Response } from "express";
import { StorefrontProducts, Product } from "../models/food.models";

const classProduct = new StorefrontProducts();

export const addOneProduct = async (req: Request, res: Response) => {
console.log(req.body);

    try {
      const dtz = {
        food_name: req.body.food_name,
        food_ingredients: req.body.food_ingredients,
        price: req.body.price,
        food_image_link: req.body.food_image_link ,
        food_image_upload: req.file?.path
      } as Product; 
      const add_product = await classProduct.addProduct(dtz);
      res.json({
        data: add_product,
      });
    } catch (error) {
      throw new Error(`Could not create product. Error: ${error}`);
    }
  };

  export const deleteUser = async (req: Request, res: Response) => {
    console.log(req);
    
    try {
      const users_delete = await classProduct.deleteUser(req.params.id as unknown as number);
      console.log(users_delete)
      res.json({
        data: users_delete,
      });
      console.log(users_delete)
    } catch (error) {
      throw new Error(` not delete USER. Error: ${error}`);
    }
  };

  
  export const indexProducts = async (_req: Request, res: Response) => {
    try {
      const product_index = await classProduct.index();
      console.log(product_index);
      
      res.json({
        message: "All Products Index",
        data: product_index,
      });
    } catch (error) {
      throw new Error(`Could not find products. Error: ${error}`);
    }
  }