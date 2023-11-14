"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.RetrunValidation = exports.V = void 0;
const Joi = __importStar(require("joi"));
const Validation = __importStar(require("express-joi-validation"));
exports.V = Validation.createValidator({ passError: true });
const RetrunValidation = (error, req, res, next) => {
    if (error && error.error && error.value && error.type) {
        return res.status(400).json(error.error.toString().replace('Error: ', ''));
    }
    else {
        return next(error);
    }
};
exports.RetrunValidation = RetrunValidation;
exports.Validator = {
    ObjectId: Joi.object({
        id: Joi.string().min(24).max(24).required()
    }),
    Id: Joi.object({
        id: Joi.string().required()
    }),
    Auth: {
        UserName: Joi.object({
            userName: Joi.string().required()
        }),
        Verify: Joi.object({
            userId: Joi.number().min(0).required(),
            phrase: Joi.array().required()
        }),
        Signup: Joi.object({
            type: Joi.string().valid('personal', 'agency').required(),
            user: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(30).required(),
                firstName: Joi.string().allow('', null).optional(),
                lastName: Joi.string().allow('', null).optional(),
                business_name: Joi.string().allow('', null).optional(),
                address: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                cap: Joi.string().required(),
                tax_id: Joi.string().required(),
                p_iva: Joi.string().allow('', null).optional(),
                sdi: Joi.string().allow('', null).optional()
            })
        })
    }
};
//# sourceMappingURL=validation.js.map