interface IAPIError {
  status?: number;
  message: string;
  type?: string;
  stack?: any;
  errors?: any;
}

export default IAPIError;
