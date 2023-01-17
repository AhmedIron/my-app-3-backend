import {Pool} from "pg"
import config from "../config"

const pool = new Pool({
    host: config.host,
    port: parseInt(config.db_port as string),
    user: config.user,
    password: config.password,
    database: config.database,
    ssl: config.ssl ,
  });
  
  pool.on("error", (error: Error) => {
    console.log(error.message);
  });
  
  export default pool;