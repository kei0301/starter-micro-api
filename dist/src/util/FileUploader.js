"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const hashStorage = multer_1.default.diskStorage({
    destination: './uploads/hash',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-c' + Date.now() + path_1.default.extname(file.originalname));
    }
});
exports.hashUploader = (0, multer_1.default)({
    storage: hashStorage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase()) {
            return cb(new Error('Please upload a Image'));
        }
        cb(null, true);
    }
});
//# sourceMappingURL=FileUploader.js.map