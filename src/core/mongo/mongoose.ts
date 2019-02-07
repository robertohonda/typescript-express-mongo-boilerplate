import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { DB_URI } from "../../config/config";

class Database {
  private mongoose: mongoose.Mongoose;
  constructor() {
    this.mongoose = mongoose;
    this.setup();
  }
  public connect() {
    this.mongoose.connect(DB_URI, { useNewUrlParser: true });
  }
  private setup = () => {
    this.mongoose.plugin(uniqueValidator);
    this.mongoose.set("useCreateIndex", true);
    this.mongoose.Promise = global.Promise;
  }
}

export default new Database();
