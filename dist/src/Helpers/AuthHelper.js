"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGoogleAccountData = exports.GetFBAccountData = exports.GetLongLiveTokenFB = void 0;
const request_1 = __importDefault(require("request"));
const exception_1 = require("../exception");
function GetLongLiveTokenFB(accessToken) {
    return new Promise((resolve, reject) => {
        const appId = process.env.FACEBOOK_CLIENT_ID;
        const appSecret = process.env.FACEBOOK_CLIENT_SECRET;
        const options = {
            method: "Get",
            url: `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${accessToken}`,
        };
        request_1.default(options, (error, response, body) => {
            try {
                const bodyJson = JSON.parse(body);
                if (bodyJson.error) {
                    throw new exception_1.BadRequestException({}, exception_1.ResponseMessage.NOVALIDTOKEN, exception_1.ResponseOrigin.INTERNALSERVER);
                }
                return resolve(bodyJson.access_token);
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.GetLongLiveTokenFB = GetLongLiveTokenFB;
function GetFBAccountData(longLiveToken) {
    return new Promise((resolve, reject) => {
        const options = {
            method: "GET",
            url: `https://graph.facebook.com/v6.0/me?locale=en_US&fields=id,name,email,gender,picture&access_token=${longLiveToken}`,
        };
        request_1.default(options, (error, response, body) => {
            try {
                const bodyJson = JSON.parse(body);
                if (bodyJson.error) {
                    throw new exception_1.BadRequestException({}, exception_1.ResponseMessage.NOVALIDTOKEN, exception_1.ResponseOrigin.INTERNALSERVER);
                }
                resolve(bodyJson);
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.GetFBAccountData = GetFBAccountData;
function GetGoogleAccountData(accessToken) {
    return new Promise((resolve, reject) => {
        const options = {
            method: "GET",
            url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
        };
        request_1.default(options, (err, res, body) => {
            try {
                const bodyJson = JSON.parse(body);
                if (bodyJson.error) {
                    throw new exception_1.BadRequestException({}, exception_1.ResponseMessage.NOVALIDTOKEN, exception_1.ResponseOrigin.INTERNALSERVER);
                }
                resolve(bodyJson);
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.GetGoogleAccountData = GetGoogleAccountData;
//# sourceMappingURL=AuthHelper.js.map