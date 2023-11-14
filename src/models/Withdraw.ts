import { model, Schema } from 'mongoose';

const withdrawSchema: Schema = new Schema(
  {
    address: {
      type: String,
      require: true
    },
    amount: {
      type: Number
    },
    state: {
      type: Number
    }
  },
  { timestamps: true }
);

// userSchema.methods.generateHash = (password: string) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// userSchema.methods.validPassword = (password: string, encrypted: string) => {
//   return bcrypt.compareSync(password, encrypted);
// };

const withdraws = model('withdraw', withdrawSchema);

export default withdraws;
