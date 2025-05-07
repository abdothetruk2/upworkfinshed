// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "./schema";

export const db = drizzle("postgres://root33:6512746@localhost:5432/mydb"!, {schema});