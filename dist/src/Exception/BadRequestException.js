"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const ResponseException_1 = require("./ResponseException");
const ResponseException_2 = require("./ResponseException");
class BadRequestException {
    constructor(Description, message, origin) {
        this.Message = message || ResponseException_1.ResponseMessage.BAD_REQUEST;
        this.Status = ResponseException_2.ResponseCode.BAD_REQUEST;
        this.Origin = origin || ResponseException_1.ResponseOrigin.INTERNALSERVER;
        this.Description = Description || {};
    }
    GetMessage() {
        return this.Message;
    }
    GetStatus() {
        return this.Status;
    }
    GetOrigin() {
        return this.Origin;
    }
}
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=BadRequestException.js.map