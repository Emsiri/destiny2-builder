import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
});

const User = Mongoose.model("user", UserSchema);
export { User };
