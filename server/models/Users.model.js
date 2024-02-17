import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const usersSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', usersSchema);

export default User;
