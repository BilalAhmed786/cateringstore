import "dotenv/config"; 
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "app/(backend)/prisma/schema.prisma",
  migrations: { path: "app/(backend)/prisma/migrations" },
  datasource: {
      url: process.env.DIRECT_URL!,
     
    },
});
