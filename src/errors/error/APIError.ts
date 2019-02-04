import { INTERNAL_SERVER_ERROR as INTERNAL_SERVER_ERROR_STATUS } from "http-status";
import { INTERNAL_SERVER_ERROR as INTERNAL_SERVER_ERROR_TYPE } from "../types/standard";
import IAPIError from "./Interface";

class APIError extends Error implements IAPIError {
  public status: number;
  public message: string;
  public type: string;
  public stack?: any;
  public errors?: any;

  constructor({
    status = INTERNAL_SERVER_ERROR_STATUS,
    type = INTERNAL_SERVER_ERROR_TYPE,
    message,
    stack,
    errors,
  }: IAPIError) {
    super(message);
    this.status = status;
    this.type = type;
    this.message = message;
    this.stack = stack;
    this.errors = errors;
  }
}

export default APIError;
