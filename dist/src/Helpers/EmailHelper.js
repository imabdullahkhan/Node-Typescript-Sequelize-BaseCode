"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplates = void 0;
const nodemailer_1 = require("nodemailer");
const path = __importStar(require("path"));
const fs_1 = require("fs");
const mustache_1 = require("mustache");
exports.EmailTemplates = {
    VERIFICATION_CODE: path.join(__dirname, "..", "templates", "VerificationCodeTemplate.html"),
    FORGOT_PASSWORD: path.join(__dirname, "..", "templates", "ForgotPasswordTemplate.html")
};
const EmailTemplateSubject = {
    VERIFICATION_CODE: "Account Verification Code.",
    FORGOT_PASSWORD: "FORGOT PASSWORD CODE"
};
class EmailHelper {
    constructor() { }
    static GetInstance() {
        if (this._instance == null) {
            console.log(process.env.SMTP_USER, process.env.SMTP_PASS, "check cered");
            this._instance = nodemailer_1.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: false,
                auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            });
        }
        return this._instance;
    }
    static _getTemplateHtml(templatePath, data) {
        const htmlTemplate = fs_1.readFileSync(templatePath, "utf-8");
        return mustache_1.render(htmlTemplate, Object.assign({}, data));
    }
    static _sendMail(to, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GetInstance().sendMail({
                from: process.env.APP_NAME,
                to,
                subject,
                html: body,
            });
        });
    }
    static SendVerificationCodeMail(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = this._getTemplateHtml(exports.EmailTemplates.VERIFICATION_CODE, { Code: data.Code });
            try {
                console.log("****************** trying to send email **********************");
                return yield this._sendMail(email, EmailTemplateSubject.VERIFICATION_CODE, html);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static SendFPMail(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = this._getTemplateHtml(exports.EmailTemplates.VERIFICATION_CODE, { Code: data.Code });
            try {
                console.log("****************** trying to send email **********************");
                return yield this._sendMail(email, EmailTemplateSubject.FORGOT_PASSWORD, html);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static SendMailWithAttachment(to, subject, body, attachment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GetInstance().sendMail({
                from: process.env.APP_NAME,
                to,
                subject,
                attachment,
                html: body,
            });
        });
    }
}
exports.default = EmailHelper;
EmailHelper._instance = null;
//# sourceMappingURL=EmailHelper.js.map