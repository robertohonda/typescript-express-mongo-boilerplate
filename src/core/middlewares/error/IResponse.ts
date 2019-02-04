interface IResponse {
  code: number;
  type: string;
  message: string;
  errors: any;
  stack: any;
}

export default IResponse;
