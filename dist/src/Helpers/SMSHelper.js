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
exports.SMSTemplate = void 0;
const twilio_1 = __importDefault(require("twilio"));
const mustache_1 = require("mustache");
exports.SMSTemplate = {
    VERIFICATION_CODE: `Your Verification Code for {{APP_NAME}} is: {{CODE}}`
};
class SMSHelper {
    constructor() { }
    static GetInstance() {
        if (this._instance == null) {
            this._instance = twilio_1.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_KEY);
        }
        return this._instance;
    }
    static sendSMS(to, content) {
        return this.GetInstance().messages.create({
            from: process.env.TWILIO_ACCOUNT_NUMBER,
            to: to,
            body: content
        });
    }
    static SendVerificationCodeSMS(to, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = mustache_1.render(exports.SMSTemplate.VERIFICATION_CODE, {
                APP_NAME: process.env.APP_NAME,
                CODE: code
            });
            try {
                return yield this.sendSMS(to, content);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = SMSHelper;
SMSHelper._instance = null;
//# sourceMappingURL=SMSHelper.js.map