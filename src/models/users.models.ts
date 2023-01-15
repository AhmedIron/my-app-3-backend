import client from "../database/index";
import bcrypt from "bcrypt";
import config from "../config";

export type User = {
    id: number;
    user_name: string;
    password: string;
    };

    export class FoodUsers {
        
      
        async logIn(user_name: string, password: string): Promise<User | null> {
          try{
            const con = await client.connect();
            const sql = `SELECT user_name, password FROM users WHERE user_name=$1`;
            const result = await con.query(sql, [user_name]);
            if (result.rows.length) {
              const user = await result.rows[0];
              if (bcrypt.compareSync(password + config.pepper, user.password)) {
                return user;
              }
            }
            return null;
          }catch (error) {
            throw new Error(`Could not create user. Error: ${error}`);
          }
        }

      
        async signUp(u: User): Promise<User> {
          try {
            const connection = await client.connect();
            const sql = `INSERT INTO users (user_name, password) 
            VALUES ($1, $2) RETURNING *`;
            const hashedPassword = bcrypt.hashSync(
              u.password + config.pepper,
              parseInt(config.salt as string)
            );
            const result = await connection.query(sql, [
              u.user_name,
              hashedPassword,
            ]);
            const user = await result.rows[0];
            connection.release();
            return user;
          } catch (error) {
            throw new Error(`Could not create user. Error: ${error}`);
          }
        }
      
        async index(): Promise<User[]> {
          try {
            const con = await client.connect();
            const sql = `SELECT id, user_name, password FROM users`;
            const result = await con.query(sql);
            const Users = result.rows;
            con.release();
            return Users;
          } catch (error) {
            throw new Error(`Could not get all users. Error: ${error}`);
          }
        }
      }
      
      export default FoodUsers;