import APIError from "errors/error";
import IResponse from "./IResponse";

class Response implements IResponse {
  public code: number;
  public type: string;
  public message: string;
  public errors: any;
  public stack: any;

  constructor(error: APIError) {
    this.code = error.status;
    this.type = error.type;
    this.message = error.message;
    this.errors = error.errors;
    this.stack = error.stack;
  }
}

export default Response;
