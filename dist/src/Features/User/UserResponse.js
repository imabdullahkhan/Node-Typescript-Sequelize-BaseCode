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
exports.LoginResponse = exports.GetUserLoginResponse = exports.GetAllUsersResponse = exports.User = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class User {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], User.prototype, "Id", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], User.prototype, "Pincode", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], User.prototype, "ExpiryPincode", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], User.prototype, "SystemGeneratedPassword", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], User.prototype, "UserStatus", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], User.prototype, "UserType", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "Name", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "ProfileImage", void 0);
exports.User = User;
class GetAllUsersResponse {
}
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", User)
], GetAllUsersResponse.prototype, "data", void 0);
exports.GetAllUsersResponse = GetAllUsersResponse;
class GetUserLoginResponse {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetUserLoginResponse.prototype, "data", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], GetUserLoginResponse.prototype, "status", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], GetUserLoginResponse.prototype, "success", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetUserLoginResponse.prototype, "message", void 0);
exports.GetUserLoginResponse = GetUserLoginResponse;
class LoginResponse {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LoginResponse.prototype, "Token", void 0);
__decorate([
    class_transformer_1.Type((val) => User),
    class_validator_1.Validate(() => true),
    __metadata("design:type", User)
], LoginResponse.prototype, "User", void 0);
exports.LoginResponse = LoginResponse;
// export class BaseResponse {
//     @IsInt()
//     status: number;
//     @IsBoolean()
//     success: boolean
//     @IsString()
//     message: string
// }
// export class AllUsersResponse extends BaseResponse {
//     @IsArray()
//     @ValidateNested({ each: true })
//     data: User;
// }
// export class UserResponse {
//     @Type((val) => User)
//     @Validate(() => true)
//     data: User;
//     @IsInt()
//     status: number;
//     @IsBoolean()
//     success: boolean
//     @IsString()
//     message: string
// }
//# sourceMappingURL=UserResponse.js.map