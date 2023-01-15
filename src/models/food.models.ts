import client from "../database";

export type Product = {
  id: number;
  food_name: string;
  food_ingredients: string;
  price: number;
  food_image_link: string;
  food_image_upload: string;
};

export class StorefrontProducts {

  async addProduct(p: Product): Promise<Product> {
    try {
      //connect to the database, using connect() method
      const con = await client.connect();
      //use Node to run a Postgres Database command INSERT
      const sql = `INSERT INTO food (food_name, food_ingredients, price, food_image_link, food_image_upload) VALUES ($1, $2, $3, $4, $5) RETURNING food_name, food_ingredients, price, food_image_link, food_image_upload`;
      //run the query on the database, and the resulting rows will be saved as the result
      const result = await con.query(sql, [p.food_name, p.food_ingredients, p.price, p.food_image_link, p.food_image_upload]);
      //save the first row result in the Product
      const Product = result.rows[0];
      //close the connection
      con.release();
      //finally return
      return Product;
      //throw the error with message
    } catch (error) {
      throw new Error(`Could not creat product. Error: ${error}`);
    }
  }

  async deleteUser(id: number): Promise<Product>{
    try{
      const con = await client.connect();
      const sql = `DELETE FROM food WHERE id=$1 RETURNING id, food_name, food_ingredients, price, food_image_link, food_image_upload`
      const result = await con.query(sql, [id])
      const finaly = result.rows[0]
      con.release()
      return finaly
    }catch (error) {
      throw new Error(`${error}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      //connect to the database, using connect() method
      const con = await client.connect();
      //use Node to run a Postgres Database command SELECT
      const sql = `SELECT * FROM food`;
      //run the query on the database, and the resulting rows will be saved as the result
      const result = await con.query(sql);
      //save the all rows result in the Products
      const Products = result.rows;
      //close the connection
      con.release();
      //finally return all rows in products table
      return Products;
      //throw the error with message
    } catch (error) {
      throw new Error(`Could not get all products. Error: ${error}`);
    }
  }
}
