"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const ResponseException_1 = require("./ResponseException");
class NotFoundException {
    constructor(message, origin) {
        this.Message = message || ResponseException_1.ResponseMessage.DefaultNotFound;
        this.Status = 404;
        this.Origin = origin || ResponseException_1.ResponseOrigin.INTERNALSERVER;
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
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=NotFoundException.js.map