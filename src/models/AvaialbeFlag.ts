import { model, Schema } from 'mongoose';

const flagSchema: Schema = new Schema(
  {
    flag: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

const AvaialbeFlag = model('availableFlag', flagSchema);

export default AvaialbeFlag;
