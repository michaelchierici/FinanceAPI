require("dotenv").config();

import validateEnv from "./utils/validateEnv";
import { AppDataSource } from "./utils/data-source";

const express = require("express");
const cors = require("./app/middlewares/cors");
const routes = require("./routes/index");
const errorHandler = require("./app/middlewares/errorHandler");

AppDataSource.initialize()
  .then(async () => {
    validateEnv();

    const app = express();
    const port = process.env.PORT;

    app.use(express.json());
    app.use(cors);
    app.use(routes);
    app.use(errorHandler);

    app.listen(port, () => console.log(`http://localhost:${port}`));
  })
  .catch((error) => console.log(error));
