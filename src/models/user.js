import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'USER'
    },
    documents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'document',
        default: null
      }
    ],
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Hash Password
userSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next();

  bcrypt
    .hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      return new Error(err.message);
    });
});

userSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const Users = mongoose.model('user', userSchema);

export default Users;
