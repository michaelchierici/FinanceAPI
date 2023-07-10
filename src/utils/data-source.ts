import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 6500,
  username: "root",
  password: "root",
  database: "node_typeorm",
  synchronize: true,
  logging: true,
  entities: ["src/app/entity/**/*{.js,.ts}"],
  migrations: ["src/migrations/**/*{.js,.ts}"],
  subscribers: [],
});
