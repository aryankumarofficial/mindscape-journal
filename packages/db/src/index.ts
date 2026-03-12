import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as  schema from "./schema"
const databaseConnectionString = process.env.DATABASE_URL;


if (!databaseConnectionString) {
  throw new Error(`DATABSE_URL is required!`);
}

declare global {
  var postgreSqlClient: ReturnType<typeof neon> | undefined;
}

let postgreSqlClient;

if (process.env.NODE_ENV !== "production") {
  if (!global.postgreSqlClient) {
      global.postgreSqlClient = neon(databaseConnectionString)
  }
  postgreSqlClient = global.postgreSqlClient
} else {
  postgreSqlClient = neon(databaseConnectionString)
}

export const db = drizzle(postgreSqlClient, {
  schema: {
    ...schema
  }
})
