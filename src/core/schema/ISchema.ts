import {Schema} from "mongoose";
interface ISchema {
  getSchema: () => Schema;
}

export default ISchema;
