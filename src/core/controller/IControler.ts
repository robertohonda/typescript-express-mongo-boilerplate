import { NextFunction, Request, Response } from "express";
interface IController {
  create?: (req: Request, res: Response, next: NextFunction) => Promise<any>;
  update?: (req: Request, res: Response, next: NextFunction) => Promise<any>;
  delete?: (req: Request, res: Response, next: NextFunction) => Promise<any>;
  list?: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}

export default IController;
