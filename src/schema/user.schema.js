import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'document',
      default: null
    }
  ]
});

const Users = mongoose.model('user', userSchema);

export default Users;
