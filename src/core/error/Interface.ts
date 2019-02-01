
interface IAPIError {
  status: number;
  type: string;
  message: any;
  stack?: any;
  errors?: any;
}

export default IAPIError;
