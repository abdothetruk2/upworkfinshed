// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "./schema";

export const db = drizzle("postgres://postgres:6512746@34.91.225.7:5432/postgres?sslmode=require"!, {schema});
