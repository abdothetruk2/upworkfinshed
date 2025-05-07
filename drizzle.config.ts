import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',       // your schema definitions
  out:    './drizzle/migrations',     // where to write new migrations
  dialect: 'postgresql',              // ← must be "postgresql"
  // driver:  <remove this entirely for a normal Postgres connection>
  dbCredentials: {
    url: "postgres://root33:6512746@localhost:5432/mydb",   // ← use `url` here
  },
} satisfies Config;
