import mongoose from "mongoose";
import { DB_URI } from "../../config/config";

class Database {
  private mongoose: mongoose.Mongoose;
  constructor() {
    this.mongoose = mongoose;
    this.setup();
  }
  private setup = () => {
    this.mongoose.Promise = global.Promise;
    this.mongoose.connect(DB_URI, { useNewUrlParser: true });
  }
}

export default Database;
