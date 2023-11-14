"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const coinSchema = new mongoose_1.Schema({
    creator: {
        type: String,
        default: ''
    },
    joiner: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0
    },
    flag: {
        type: Boolean,
        default: false
    },
    state: {
        type: String,
        default: 'not'
    }
}, { timestamps: true });
const CoinHistorys = (0, mongoose_1.model)('coinhistorys', coinSchema);
exports.default = CoinHistorys;
//# sourceMappingURL=CoinFlip.js.map