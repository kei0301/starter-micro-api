"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const apySchema = new mongoose_1.Schema({
    apy: {
        type: Number,
        default: 3.89
    }
}, { timestamps: true });
const APYFlag = (0, mongoose_1.model)('apy', apySchema);
exports.default = APYFlag;
//# sourceMappingURL=APY.js.map