import dotenv from "dotenv";

dotenv.config();

const { PORT, NODE_ENV, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_test, POSTGRES_USER, POSTGRES_Password, BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET, SSL } = process.env;

export default {
  port: PORT,
  host: POSTGRES_HOST,
  db_port: POSTGRES_PORT,
  user: POSTGRES_USER,
  password: POSTGRES_Password,
  database: POSTGRES_DB,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,
  ssl: true
};