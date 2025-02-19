import { model, Schema } from "mongoose";

const useSchema = new Schema({
  email: { type: String, required: true },
  password:{type:String,required:true}
});

const userModel = model("users",useSchema)

export default userModel  