"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const withdrawSchema = new mongoose_1.Schema({
    address: {
        type: String,
        require: true
    },
    amount: {
        type: Number
    },
    state: {
        type: Number
    }
}, { timestamps: true });
// userSchema.methods.generateHash = (password: string) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };
// userSchema.methods.validPassword = (password: string, encrypted: string) => {
//   return bcrypt.compareSync(password, encrypted);
// };
const withdraws = (0, mongoose_1.model)('withdraw', withdrawSchema);
exports.default = withdraws;
//# sourceMappingURL=Withdraw.js.map