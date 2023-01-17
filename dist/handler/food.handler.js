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
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexProducts = exports.deleteUser = exports.addOneProduct = void 0;
const food_models_1 = require("../models/food.models");
const classProduct = new food_models_1.StorefrontProducts();
const addOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    try {
        const dtz = {
            food_name: req.body.food_name,
            food_ingredients: req.body.food_ingredients,
            price: req.body.price,
            food_image_link: req.body.food_image_link,
            food_image_upload: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path
        };
        const add_product = yield classProduct.addProduct(dtz);
        res.json({
            data: add_product,
        });
    }
    catch (error) {
        throw new Error(`Could not create product. Error: ${error}`);
    }
});
exports.addOneProduct = addOneProduct;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    try {
        const users_delete = yield classProduct.deleteUser(req.params.id);
        console.log(users_delete);
        res.json({
            data: users_delete,
        });
        console.log(users_delete);
    }
    catch (error) {
        throw new Error(` not delete USER. Error: ${error}`);
    }
});
exports.deleteUser = deleteUser;
const indexProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_index = yield classProduct.index();
        res.json({
            message: "All Products Index",
            data: product_index,
        });
    }
    catch (error) {
        throw new Error(`Could not find products. Error: ${error}`);
    }
});
exports.indexProducts = indexProducts;
