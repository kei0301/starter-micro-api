import { model, Schema } from 'mongoose';

const coinSchema: Schema = new Schema(
  {
    creator: {
      type: String,
      default: ''
    },
    joiner:{
      type: String,
      default: ''
    },
    amount:{
        type: Number,
        default: 0
    },
    flag:{
        type: Boolean,
        default: false
    },
    state:{
        type: String,
        default: 'not'
    }
  },
  { timestamps: true }
);

const CoinHistorys = model('coinhistorys', coinSchema);

export default CoinHistorys;
