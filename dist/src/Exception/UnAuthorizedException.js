"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedException = void 0;
const ResponseException_1 = require("./ResponseException");
const ResponseException_2 = require("./ResponseException");
const ResponseException_3 = require("./ResponseException");
class UnAuthorizedException extends ResponseException_2.ResponseException {
    constructor(message, origin) {
        super(message || ResponseException_1.ResponseMessage.DefaultUnAuthorized, origin || ResponseException_1.ResponseOrigin.INTERNALSERVER);
        this.Status = ResponseException_3.ResponseCode.UNAUTHORIZED;
    }
}
exports.UnAuthorizedException = UnAuthorizedException;
//# sourceMappingURL=UnAuthorizedException.js.map