import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "../../.env"),
});

import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as  schema from "./schema"
const databaseConnectionString = process.env.DATABASE_URL;


if (!databaseConnectionString) {
  throw new Error(`DATABASE_URL is required! : ${databaseConnectionString}`,);
}

const pool = new Pool({
  connectionString: databaseConnectionString,
})

export const db = drizzle(pool, {
  schema,
  logger: process.env.NODE_ENV!=="production"? {
    logQuery(query, params) {
      console.log("\n🟦 DRIZZLE QUERY");
      console.log("SQL:", query);
      console.log("PARAMS:", params);
    }
  }:false
})

export * from "./schema"
