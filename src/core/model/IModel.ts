import { Document, Model } from "mongoose";

interface IModel {
  getModel: () => Model<Document>;
}

export default IModel;
