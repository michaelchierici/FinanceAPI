import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../app/entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 6500,
  username: "root",
  password: "root",
  database: "node_typeorm",
  synchronize: true,
  logging: false,
  entities: [`src/app/entity/*.[jt]s`],
  migrations: [`src/migrations/*/.[jt]s`],
  subscribers: [],
});
