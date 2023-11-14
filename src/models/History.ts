import { model, Schema } from 'mongoose';

const historySchema: Schema = new Schema(
  {
    txid: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      default: ''
    },
    amount:{
      type: Number,
    },
    date:{
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const Historys = model('historys', historySchema);

export default Historys;
