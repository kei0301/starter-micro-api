"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    address: {
        type: String,
        require: true,
        unique: true
    },
    value: {
        type: Number,
    },
}, { timestamps: true });
// userSchema.methods.generateHash = (password: string) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };
// userSchema.methods.validPassword = (password: string, encrypted: string) => {
//   return bcrypt.compareSync(password, encrypted);
// };
const Users = (0, mongoose_1.model)('users', userSchema);
exports.default = Users;
//# sourceMappingURL=Users.js.map