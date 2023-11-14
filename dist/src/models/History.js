"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const historySchema = new mongoose_1.Schema({
    txid: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
    },
    date: {
        type: String,
        default: ''
    }
}, { timestamps: true });
const Historys = (0, mongoose_1.model)('historys', historySchema);
exports.default = Historys;
//# sourceMappingURL=History.js.map