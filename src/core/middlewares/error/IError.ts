import { NextFunction, Request, Response } from "express";
import APIError from "../../../errors/error";
interface IError {
  handleError: (err: APIError, req: Request, res: Response, next: NextFunction) => void;
  handleNotFound: (req: Request, res: Response, next: NextFunction) => void;
  handleResponse: (err: APIError, res: Response) => void;
}

export default IError;
