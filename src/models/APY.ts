import { model, Schema } from 'mongoose';

const apySchema: Schema = new Schema(
  {
    apy: {
      type: Number,
      default: 3.89
    }
  },
  { timestamps: true }
);

const APYFlag = model('apy', apySchema);

export default APYFlag;
