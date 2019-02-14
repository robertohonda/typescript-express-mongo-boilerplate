import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { DB_URI } from "../../config/config";

class Database {
  constructor() {
    this.setup();
  }
  public connect = (): void => {
    mongoose.connect(DB_URI, { useNewUrlParser: true }).catch((err) => {
      // tslint:disable-next-line:no-console
      console.error("An error occurred while connecting to the database", err);
    });
  }
  private setup = (): void => {
    mongoose.plugin(uniqueValidator);
    mongoose.set("useCreateIndex", true);
    mongoose.Promise = global.Promise;
  }
}

export default new Database();
