import { NextFunction, Request, Response } from "express";
interface IController {
  create?: (req: Request, res: Response, next: NextFunction) => void;
  update?: (req: Request, res: Response, next: NextFunction) => void;
  delete?: (req: Request, res: Response, next: NextFunction) => void;
  list?: (req: Request, res: Response, next: NextFunction) => void;
}

export default IController;
