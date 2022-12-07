import { Schema, model } from "mongoose"
import IUser from "./IUser"


const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // books: {
  //   type: [{
  //     title: String,
  //     author: String,
  //     image: String,
  //     description: String,
  //     pages: Number
  //   }],}
  },
  { timestamps: true }

)

const User = model<IUser>('User', UserSchema);

export default User;