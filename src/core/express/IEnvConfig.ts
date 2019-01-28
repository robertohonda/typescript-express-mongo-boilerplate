import { RequestHandler } from "express";

interface IEnvConfig {
  getMiddlewares(): RequestHandler[];
};

export default IEnvConfig