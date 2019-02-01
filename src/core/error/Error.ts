import IAPIError from "./Interface";
import {INTERNAL_SERVER_ERROR} from "./types";

class APIError implements IAPIError {
  public status: number;
  public type: string;
  public message: any;
  public stack: any;
  public errors: any;

  constructor(params: IAPIError) {
    this.status = params.status || 500;
    this.type = params.type || INTERNAL_SERVER_ERROR;
    this.message = params.message;
    this.stack = params.stack;
    this.errors = params.errors;
  }
}

export default APIError;
