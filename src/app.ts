require("dotenv").config();
import express from "express";
import config from "config";
import { AppDataSource } from "./utils/data-source";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    const port = config.get<number>("port");
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
