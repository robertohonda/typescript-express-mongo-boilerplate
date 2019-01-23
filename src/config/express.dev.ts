import { RequestHandler } from "express";
import morgan from "morgan";

const middlewares: RequestHandler[] = [
  morgan("dev"),
];

export default middlewares;
