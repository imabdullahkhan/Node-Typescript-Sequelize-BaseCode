"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FatalErrorException = void 0;
const ResponseException_1 = require("./ResponseException");
const ResponseException_2 = require("./ResponseException");
const ResponseException_3 = require("./ResponseException");
class FatalErrorException extends ResponseException_2.ResponseException {
    constructor(origin, message) {
        super(message || ResponseException_1.ResponseMessage.SERVER_ERROR, origin || ResponseException_1.ResponseOrigin.INTERNALSERVER);
        this.Status = ResponseException_3.ResponseCode.SERVER_ERROR;
    }
}
exports.FatalErrorException = FatalErrorException;
//# sourceMappingURL=FatalErrorException.js.map