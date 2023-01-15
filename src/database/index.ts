import {Pool} from "pg"
import config from "../config"

const pool = new Pool({
    host: "dpg-cf254nh4reb5o44944og-a",
    port: 5432,
    user: "postgres_1_e1gb_user",
    password: "WYEuHbHed0emGuUHtMul5jmLFCFlvQau",
    database: "postgres",
  });
  
  pool.on("error", (error: Error) => {
    console.log(error.message);
  });
  
  export default pool;