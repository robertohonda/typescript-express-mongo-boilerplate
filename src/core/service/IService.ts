interface IService {
  create?: (params: any) => void;
  update?: (params: any) => void;
  delete?: (params: any) => void;
  list?: (params: any) => void;
}

export default IService;
