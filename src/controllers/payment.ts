import Users from '../models/Users';
import Historys from '../models/History';
import Withdraws from '../models/Withdraw';
import AvaialbeFlags from '../models/AvaialbeFlag';
import APYS from '../models/APY';

export const deposit = async (req: any, res: any) => {
  let data = await Historys.findOne({ txid: req.body.txid });
  if (data) {
    res.json('exist');
  } else {
    let userExist = await Users.findOne({ address: req.body.address });
    let userData;
    if (userExist) {
      await Users.updateOne(
        {
          address: req.body.address
        },
        { $inc: { value: Number(req.body.amount) } }
      );
      userData = await Users.findOne({ address: req.body.address });
    } else {
      const newUser = new Users({
        address: req.body.address,
        value: Number(req.body.amount)
      });
      userData = await newUser.save();
    }
    const newHistory = new Historys({
      txid: req.body.txid,
      address: req.body.address,
      amount: Number(req.body.amount),
      date: new Date().getTime()
    });
    await newHistory.save();
    res.json(userData);
  }
};

export const checkedWithdraw = async (req: any, res: any) => {
  try {
    await Withdraws.updateOne(
      { address: req.body.rowdata.address, state: 0 },
      { state: 1 }
    );

    await Users.updateOne(
      { address: req.body.rowdata.address },
      { $inc: { value: -1 * req.body.rowdata.amount } }
    );
    res.json('success');
  } catch (error) {
    res.json(error);
  }
};

export const getAPY = async (req: any, res: any) => {
  let data = await APYS.findOne({});
  if (!data) {
    const newAPY = new APYS({ apy: 3.89 });
    data = await newAPY.save();
  }
  res.json(data);
};

export const updateAPY = async (req: any, res: any) => {
  const data = await APYS.updateMany({ apy: req.body.apy });
  res.json(data);
};
export const getavailable = async (req: any, res: any) => {
  let data = await AvaialbeFlags.findOne({});
  if (!data) {
    const newflags = new AvaialbeFlags({ flag: true });
    data = await newflags.save();
  }
  res.json(data);
};

export const updateAvailableFlag = async (req: any, res: any) => {
  const data = await AvaialbeFlags.updateMany({ flag: req.body.flag });
  console.log(data);
  res.json(data);
};

export const getdata = async (req: any, res: any) => {
  const data = await Users.findOne({ address: req.body.address });
  let duringTime = 0;
  if (data) {
    duringTime =
      (new Date().getTime() - new Date(data.updatedAt).getTime()) /
      1000 /
      60 /
      60 /
      24;
  }
  res.json({ data, duringTime });
};

export const getTVL = async (req: any, res: any) => {
  const data = await Users.find();
  res.json(data);
};
export const getWithdrawlist = async (req: any, res: any) => {
  const data = await Withdraws.find({ state: 0 });
  res.json(data);
};

export const request = async (req: any, res: any) => {
  const data = await Withdraws.findOne({ address: req.body.address, state: 0 });
  if (data) {
    res.json('exist');
  } else {
    const newHistory = new Withdraws({
      address: req.body.address,
      amount: Number(req.body.amount),
      state: 0
    });
    let data = await newHistory.save();
    res.json(data);
  }
};
