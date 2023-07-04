import { Request, Response, NextFunction } from "express";
module.exports = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error);
  response.sendStatus(500);
};
