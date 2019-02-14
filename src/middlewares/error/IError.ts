import { NextFunction, Request, Response } from "express";
interface IError {
  handleError: (err: Error, req: Request, res: Response, next: NextFunction) => void;
  handleNotFound: (req: Request, res: Response, next: NextFunction) => void;
  handleResponse: (err: Error, res: Response) => void;
}

export default IError;
