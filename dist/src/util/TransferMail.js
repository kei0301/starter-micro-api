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
exports.transferMail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const client_1 = __importDefault(require("@sendgrid/client"));
const config_1 = require("../config");
// Override baseUrl to use TLS 1.2+ test endpoint
client_1.default.setApiKey(config_1.SENDGRID_API_KEY);
client_1.default.setDefaultRequest("baseUrl", "https://tls12.api.sendgrid.com");
mail_1.default.setClient(client_1.default);
// const templateId = SENDGRID_TEMPLATE;
const from = config_1.SMTP_USER;
const transferMail = (receiver, subject, templateId, dynamicTemplateData = null) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msg = {
            to: receiver,
            from,
            subject,
            templateId,
        };
        if (dynamicTemplateData)
            msg.dynamicTemplateData = dynamicTemplateData;
        const result = yield mail_1.default.send(msg);
        return result;
    }
    catch (err) {
        console.error("Falid sending email error : ", err.response.body);
        return false;
    }
});
exports.transferMail = transferMail;
//# sourceMappingURL=TransferMail.js.map