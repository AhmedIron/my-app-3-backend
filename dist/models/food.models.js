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
exports.StorefrontProducts = void 0;
const database_1 = __importDefault(require("../database"));
class StorefrontProducts {
    addProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //connect to the database, using connect() method
                const con = yield database_1.default.connect();
                //use Node to run a Postgres Database command INSERT
                const sql = `INSERT INTO food (food_name, food_ingredients, price, food_image_link, food_image_upload) VALUES ($1, $2, $3, $4, $5) RETURNING food_name, food_ingredients, price, food_image_link, food_image_upload`;
                //run the query on the database, and the resulting rows will be saved as the result
                const result = yield con.query(sql, [p.food_name, p.food_ingredients, p.price, p.food_image_link, p.food_image_upload]);
                //save the first row result in the Product
                const Product = result.rows[0];
                //close the connection
                con.release();
                //finally return
                return Product;
                //throw the error with message
            }
            catch (error) {
                throw new Error(`Could not creat product. Error: ${error}`);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = `DELETE FROM food WHERE id=$1 RETURNING id, food_name, food_ingredients, price, food_image_link, food_image_upload`;
                const result = yield con.query(sql, [id]);
                const finaly = result.rows[0];
                con.release();
                return finaly;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //connect to the database, using connect() method
                const con = yield database_1.default.connect();
                //use Node to run a Postgres Database command SELECT
                const sql = `SELECT * FROM food`;
                //run the query on the database, and the resulting rows will be saved as the result
                const result = yield con.query(sql);
                //save the all rows result in the Products
                const Products = result.rows;
                //close the connection
                con.release();
                //finally return all rows in products table
                return Products;
                //throw the error with message
            }
            catch (error) {
                throw new Error(`Could not get all products. Error: ${error}`);
            }
        });
    }
}
exports.StorefrontProducts = StorefrontProducts;
