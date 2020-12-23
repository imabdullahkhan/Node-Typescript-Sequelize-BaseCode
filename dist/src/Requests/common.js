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
exports.PaginationParams = exports.SearchRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class SearchRequest {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SearchRequest.prototype, "search", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(value => parseInt(value)),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], SearchRequest.prototype, "page", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(value => parseInt(value)),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], SearchRequest.prototype, "limit", void 0);
exports.SearchRequest = SearchRequest;
class PaginationParams {
}
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(value => parseInt(value)),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], PaginationParams.prototype, "page", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(value => parseInt(value)),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PaginationParams.prototype, "limit", void 0);
exports.PaginationParams = PaginationParams;
//# sourceMappingURL=common.js.map