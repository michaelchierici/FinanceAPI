import { Request, Response } from "express";
module.exports = (request: Request, response: Response, next: Function) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Max-Age", "10");

  next();
};
