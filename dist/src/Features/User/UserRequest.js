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
exports.FacebookLoginRequest = exports.FindUserRequest = exports.UserUpdateRequest = exports.ChangePasswordRequest = exports.ResendVerifyCodeRequest = exports.DeleteByIdRequest = exports.UserVerifyRequest = exports.UserLoginRequest = exports.UserRegistrationRequest = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../Constrants/enums");
const class_transformer_1 = require("class-transformer");
class UserRegistrationRequest {
}
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserRegistrationRequest.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(6, 14),
    __metadata("design:type", String)
], UserRegistrationRequest.prototype, "password", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UserRegistrationRequest.prototype, "userType", void 0);
exports.UserRegistrationRequest = UserRegistrationRequest;
class UserLoginRequest {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserLoginRequest.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(6, 14),
    __metadata("design:type", String)
], UserLoginRequest.prototype, "password", void 0);
exports.UserLoginRequest = UserLoginRequest;
class UserVerifyRequest {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserVerifyRequest.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserVerifyRequest.prototype, "pin", void 0);
exports.UserVerifyRequest = UserVerifyRequest;
class DeleteByIdRequest {
}
__decorate([
    class_validator_1.IsInt(),
    class_transformer_1.Transform((val) => Number(val)),
    __metadata("design:type", Number)
], DeleteByIdRequest.prototype, "Id", void 0);
exports.DeleteByIdRequest = DeleteByIdRequest;
class ResendVerifyCodeRequest {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ResendVerifyCodeRequest.prototype, "email", void 0);
exports.ResendVerifyCodeRequest = ResendVerifyCodeRequest;
class ChangePasswordRequest {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ChangePasswordRequest.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ChangePasswordRequest.prototype, "newPassword", void 0);
exports.ChangePasswordRequest = ChangePasswordRequest;
class UserUpdateRequest {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserUpdateRequest.prototype, "Name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", Number)
], UserUpdateRequest.prototype, "ProfileImage", void 0);
exports.UserUpdateRequest = UserUpdateRequest;
class FindUserRequest {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FindUserRequest.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FindUserRequest.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FindUserRequest.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FindUserRequest.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(value => parseInt(value)),
    class_validator_1.IsEnum(enums_1.UserStatus, { each: true }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], FindUserRequest.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(value => parseInt(value)),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], FindUserRequest.prototype, "age", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(value => parseInt(value)),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], FindUserRequest.prototype, "page", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(value => parseInt(value)),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], FindUserRequest.prototype, "limit", void 0);
exports.FindUserRequest = FindUserRequest;
class FacebookLoginRequest {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FacebookLoginRequest.prototype, "accessToken", void 0);
exports.FacebookLoginRequest = FacebookLoginRequest;
//# sourceMappingURL=UserRequest.js.map