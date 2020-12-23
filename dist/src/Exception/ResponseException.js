"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessage = exports.ResponseOrigin = exports.ResponseCode = exports.ResponseException = void 0;
class ResponseException {
    constructor(message, origin) {
        this.Message = message;
        this.Origin = origin;
    }
    GetMessage() {
        return this.Message;
    }
    GetStatus() {
        return this.Status;
    }
}
exports.ResponseException = ResponseException;
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["ALREADYEXIST"] = 501] = "ALREADYEXIST";
    ResponseCode[ResponseCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseCode[ResponseCode["REQUEST_FAILED"] = 402] = "REQUEST_FAILED";
    ResponseCode[ResponseCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseCode[ResponseCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseCode[ResponseCode["CONFLICT"] = 409] = "CONFLICT";
    ResponseCode[ResponseCode["TOO_MANY_REQUEST"] = 429] = "TOO_MANY_REQUEST";
    ResponseCode[ResponseCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseCode[ResponseCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    ResponseCode[ResponseCode["SUCCESS"] = 200] = "SUCCESS";
    ResponseCode[ResponseCode["UNPROCESSABLE"] = 422] = "UNPROCESSABLE";
})(ResponseCode = exports.ResponseCode || (exports.ResponseCode = {}));
var ResponseOrigin;
(function (ResponseOrigin) {
    ResponseOrigin["AWS"] = "AWS S3";
    ResponseOrigin["STRIPE"] = "STRIPE";
    ResponseOrigin["INTERNALSERVER"] = "INTERNAL SERVER";
    ResponseOrigin["ESTATEDSERVER"] = "ERROR ON ESTATED SERVER";
    ResponseOrigin["DIRECTMAILER"] = "ERROR DIRECT MAILER";
})(ResponseOrigin = exports.ResponseOrigin || (exports.ResponseOrigin = {}));
var ResponseMessage;
(function (ResponseMessage) {
    ResponseMessage["BAD_REQUEST"] = "The request was unacceptable, often due to missing a required parameter.";
    ResponseMessage["Unauthorized"] = "No valid API key provided.";
    ResponseMessage["REQUEST_FAILED"] = "The parameters were valid but the request failed.";
    ResponseMessage["FORBIDDEN"] = "The User/Api-key doesn't have permissions to perform the request.";
    ResponseMessage["NOTFOUND"] = "The requested resource doesn't exist";
    ResponseMessage["CONFLICT"] = "The request conflicts with another request (perhaps due to using the same idempotent key).";
    ResponseMessage["TOO_MANY_REQUEST"] = "Too Many Requests\tToo many requests hit the API too quickly. We recommend an exponential backoff of your requests.";
    ResponseMessage["SERVER_ERROR"] = "Server Errors\tSomething went wrong";
    ResponseMessage["FATALERROR"] = "Unexpected Error Occurs";
    ResponseMessage["UNAUTHORIZED"] = "Unauthorized or No Permission for request. Token Mismatch.";
    ResponseMessage["NOVALIDTOKEN"] = "No Such Valid Token for facebook";
    ResponseMessage["UNPROCESSABLE"] = "This request is  Unprocessable,often due to key is already exists";
    ResponseMessage["NOTVERIFIEDORNOTADDEDSUBSCRIPTIONPACKAGE"] = "This request can't be process, due to company status or subscription package or member is not exist in company";
    ResponseMessage["COMPANYANDUSERMISSEDMATCH"] = " Company and user is missed match";
    ResponseMessage["ADDRESSNOTPARSE"] = "Address not parse";
    ResponseMessage["UNABLETOFINDOUTREQUEST"] = "We were unable to find results for the request.";
    ResponseMessage["THREEATTEMPTFAILD"] = "3 times login attempt is failed, your account is locked for security reasons. Click Forgot password to reset";
    ResponseMessage["COMPANYSTATUSISUNACTIVE"] = "Company status is inactive ";
    // SUCCESS = "Success",
    // SUCCESS_WITH_NO_CONTENT = "No Content",
    // FORBIDDEN = "Not allowed for performing this action.",
    // BAD_REQUEST = "Bad Request. Please verify your request input.",
    // SERVER_ERROR = "Internal Server Error",
    // NOT_FOUND = "Resource Not found",
    // DefaultForbidden= "Access not allowed",
    // Default= "Message Error",
    // FieldValidationErrors= "%{field} must be %{constraints}",
    // IsEmailConstraint= "",
    // MultipleValuesGlue= ",",
    ResponseMessage["DefaultNotFound"] = "Resource not found";
    // DefaultServerError= "Something went wrong",
    // DefaultBadRequest= "Bad request, Check input",
    ResponseMessage["DefaultUnAuthorized"] = "Not Authorized/ No token provided";
    // EmailAlreadyExists= "Email already exists",
    // EmailNotRegistered= "Email not registered",
    // EmailUnVerified= "Email is not verified",
    // InvalidAgentIds= "Invalid Agent Ids",
    // InvalidCredentials= "Invalid Credentials",
    // InvalidIconId= "IconId is Invalid",
    // InvalidIconIdType= "IconId should be of image type",
    // WebsiteNotFound= "Website not found",
    // MinConstraint= "greater",
    // Address= "950 E. State Highway 114, Suite 160, Southlake, Texas, 76092",
    // PhoneNumber= "+1-646-801-9992",
    // Email= "support@app.io",
    // DontLikeEmails= "Don't like these emails?",
    // Unsubscribe= "Unsubscribe",
    // ResetPasswordDescription= "It's time to set your new Password",
    // ResetPasswordTitle= "Reset Password",
    // ResetPasswordName= "",
    // tslint:disable-next-line: max-line-length
    // ResetPasswordPurpose= "Please verify your email address by clicking on the button or paste this given url in browser" ,
    // ResetPasswordEndingWords= "Thank you ,Good Luck",
    // ResetPasswordSubject= "Reset Password",
    // ResetPasswordButtonText= "Verify Email"
})(ResponseMessage = exports.ResponseMessage || (exports.ResponseMessage = {}));
//# sourceMappingURL=ResponseException.js.map