"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.getWithdrawlist = exports.getTVL = exports.getdata = exports.updateAvailableFlag = exports.getavailable = exports.updateAPY = exports.getAPY = exports.checkedWithdraw = exports.deposit = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const History_1 = __importDefault(require("../models/History"));
const Withdraw_1 = __importDefault(require("../models/Withdraw"));
const AvaialbeFlag_1 = __importDefault(require("../models/AvaialbeFlag"));
const APY_1 = __importDefault(require("../models/APY"));
const deposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield History_1.default.findOne({ txid: req.body.txid });
    if (data) {
        res.json('exist');
    }
    else {
        let userExist = yield Users_1.default.findOne({ address: req.body.address });
        let userData;
        if (userExist) {
            yield Users_1.default.updateOne({
                address: req.body.address
            }, { $inc: { value: Number(req.body.amount) } });
            userData = yield Users_1.default.findOne({ address: req.body.address });
        }
        else {
            const newUser = new Users_1.default({
                address: req.body.address,
                value: Number(req.body.amount)
            });
            userData = yield newUser.save();
        }
        const newHistory = new History_1.default({
            txid: req.body.txid,
            address: req.body.address,
            amount: Number(req.body.amount),
            date: new Date().getTime()
        });
        yield newHistory.save();
        res.json(userData);
    }
});
exports.deposit = deposit;
const checkedWithdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Withdraw_1.default.updateOne({ address: req.body.rowdata.address, state: 0 }, { state: 1 });
        yield Users_1.default.updateOne({ address: req.body.rowdata.address }, { $inc: { value: -1 * req.body.rowdata.amount } });
        res.json('success');
    }
    catch (error) {
        res.json(error);
    }
});
exports.checkedWithdraw = checkedWithdraw;
const getAPY = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield APY_1.default.findOne({});
    if (!data) {
        const newAPY = new APY_1.default({ apy: 3.89 });
        data = yield newAPY.save();
    }
    res.json(data);
});
exports.getAPY = getAPY;
const updateAPY = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield APY_1.default.updateMany({ apy: req.body.apy });
    res.json(data);
});
exports.updateAPY = updateAPY;
const getavailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield AvaialbeFlag_1.default.findOne({});
    if (!data) {
        const newflags = new AvaialbeFlag_1.default({ flag: true });
        data = yield newflags.save();
    }
    res.json(data);
});
exports.getavailable = getavailable;
const updateAvailableFlag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield AvaialbeFlag_1.default.updateMany({ flag: req.body.flag });
    console.log(data);
    res.json(data);
});
exports.updateAvailableFlag = updateAvailableFlag;
const getdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Users_1.default.findOne({ address: req.body.address });
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
});
exports.getdata = getdata;
const getTVL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Users_1.default.find();
    res.json(data);
});
exports.getTVL = getTVL;
const getWithdrawlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Withdraw_1.default.find({ state: 0 });
    res.json(data);
});
exports.getWithdrawlist = getWithdrawlist;
const request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Withdraw_1.default.findOne({ address: req.body.address, state: 0 });
    if (data) {
        res.json('exist');
    }
    else {
        const newHistory = new Withdraw_1.default({
            address: req.body.address,
            amount: Number(req.body.amount),
            state: 0
        });
        let data = yield newHistory.save();
        res.json(data);
    }
});
exports.request = request;
//# sourceMappingURL=payment.js.map