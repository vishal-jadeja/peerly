import path from "path";
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma evaluates this config before it loads .env, so we load it manually first.
config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
