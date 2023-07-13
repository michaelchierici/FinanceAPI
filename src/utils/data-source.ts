import "reflect-metadata";
import { DataSource } from "typeorm";
const env = process.env;
const {
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: ["src/app/entity/**/*{.js,.ts}"],
  migrations: ["src/migrations/**/*{.js,.ts}"],
  subscribers: [],
});
