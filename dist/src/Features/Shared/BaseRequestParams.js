"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOneRequestParams = exports.FindByIdRequestParams = exports.FindRequestParams = void 0;
class FindRequestParams {
    constructor() {
        this.whereParams = {};
        this.include = [];
        this.raw = true;
        this.group = [];
    }
}
exports.FindRequestParams = FindRequestParams;
class FindByIdRequestParams {
    constructor() {
        this.include = [];
        this.raw = true;
    }
}
exports.FindByIdRequestParams = FindByIdRequestParams;
class FindOneRequestParams {
    constructor() {
        this.whereParams = {};
        this.include = [];
        this.raw = true;
    }
}
exports.FindOneRequestParams = FindOneRequestParams;
//# sourceMappingURL=BaseRequestParams.js.map