interface IAPIResponse {
  status?: number;
  message?: string;
  type?: string;
  data?: any;
  count?: number;
}

export default IAPIResponse;
