import { NextFunction, Request, Response } from "express";

class Controller {
  protected handleResponse = (promise: Promise<any>, req: Request, res: Response, next: NextFunction) => {
    return promise
      .then((result) => res.json(result || { message: "OK" }))
      .catch((error) => res.status(500) && next(error));
  }
}

export default Controller;
