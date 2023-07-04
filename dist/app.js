"use strict";
const express = require("express");
require("express-async-errors");
const app = express();
app.use(express.json());
app.listen(5000, () => console.log("http://localhost:5000"));
