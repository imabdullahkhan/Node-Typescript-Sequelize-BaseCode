"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponse = exports.DataResponse = void 0;
const class_validator_1 = require("class-validator");
class DataResponse {
    constructor(data, message) {
        this.data = data;
        this.status = 200;
        this.success = true;
        this.message = message;
    }
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], DataResponse.prototype, "success", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], DataResponse.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DataResponse.prototype, "message", void 0);
exports.DataResponse = DataResponse;
class MessageResponse {
    constructor(message) {
        this.status = 200;
        this.success = true;
        this.message = message;
    }
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], MessageResponse.prototype, "success", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], MessageResponse.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MessageResponse.prototype, "message", void 0);
exports.MessageResponse = MessageResponse;
//# sourceMappingURL=common.js.map