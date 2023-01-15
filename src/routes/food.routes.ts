import { Router } from "express";
import * as productsHandler from "../handler/food.handler";
import multer from "multer";
import TokenRequired from "../custom.middleware/authentication.custom.middleware";
const productsRroutes = Router();

productsRroutes.post("/", multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "images")
        },
        filename(req, file, callback) {
            callback(null, Date.now()+"_"+file.originalname)
        }
    })
  }).single("food_image"), productsHandler.addOneProduct);

productsRroutes.get("/", productsHandler.indexProducts);

productsRroutes.delete("/:id",TokenRequired, productsHandler.deleteUser)



export default productsRroutes;