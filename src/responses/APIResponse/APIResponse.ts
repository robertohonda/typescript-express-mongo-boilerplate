import { OK } from "http-status";
import {OK as OK_MESSAGE} from "../../messages/standard";
import { SUCCESS } from "../../messages/types/standard";
import IAPIResponse from "./IAPIResponse";

class APIResponse implements IAPIResponse {
  public status: number;
  public message?: string;
  public type: string;
  public data?: any;
  public count?: number;

  constructor({
    message = OK_MESSAGE,
    type = SUCCESS,
    status = OK,
    data,
    count,
  }: IAPIResponse) {
    this.status = status;
    this.type = type;
    this.message = message;
    this.data = data;
    this.count = count;
  }
}

export default APIResponse;
