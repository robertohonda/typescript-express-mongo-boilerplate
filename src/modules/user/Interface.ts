import {Document} from "mongoose";

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isValidPassword: (password: string) => boolean;
}

export default IUser;
