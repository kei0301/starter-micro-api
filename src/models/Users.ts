import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema(
  {
    address: {
      type: String,
      require: true,
      unique: true
    },
    value: {
      type: Number,
    },
  },
  { timestamps: true }
);

// userSchema.methods.generateHash = (password: string) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// userSchema.methods.validPassword = (password: string, encrypted: string) => {
//   return bcrypt.compareSync(password, encrypted);
// };

const Users = model('users', userSchema);

export default Users;
