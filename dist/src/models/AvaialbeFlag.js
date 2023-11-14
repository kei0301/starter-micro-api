"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const flagSchema = new mongoose_1.Schema({
    flag: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
const AvaialbeFlag = (0, mongoose_1.model)('availableFlag', flagSchema);
exports.default = AvaialbeFlag;
//# sourceMappingURL=AvaialbeFlag.js.map