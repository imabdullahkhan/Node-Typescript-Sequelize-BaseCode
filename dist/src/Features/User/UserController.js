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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const UserService_1 = __importDefault(require("./UserService"));
const decorators_1 = require("../../Swagger-rc/decorators");
const UserRequest_1 = require("./UserRequest");
const common_1 = require("../../Response/common");
const UserResponse_1 = require("./UserResponse");
const UserMessage_1 = require("./UserMessage");
const common_2 = require("../../Requests/common");
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    Verify(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.DataResponse(yield this._userService.Verify(data), UserMessage_1.Messages.SucessfullyUserVerified);
        });
    }
    GetAllUsers(paginationParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.DataResponse(yield this._userService.GetAllUsers(paginationParams), UserMessage_1.Messages.SucessfullyFetchedAllUsers);
        });
    }
    ResendCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.MessageResponse(yield this._userService.ResendVerifyCode(data));
        });
    }
    Me(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.DataResponse(yield this._userService.me(user), " User Data Found");
        });
    }
    Register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.DataResponse(yield this._userService.Register(user), UserMessage_1.Messages.SuccessfullyUserRegister);
        });
    }
    Login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.DataResponse(yield this._userService.Login(user), UserMessage_1.Messages.SucessfullyLogin);
        });
    }
    ForgotPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.MessageResponse(yield this._userService.ForgotPassword(user));
        });
    }
    DeleteById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.MessageResponse(yield this._userService.DeleteOne(data));
        });
    }
    UpdateUser(data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new common_1.MessageResponse(yield this._userService.UpdateUser(data, user.Id));
        });
    }
};
__decorate([
    decorators_1.Get("/verify", {
        successResponseOptions: {
            model: UserResponse_1.GetUserLoginResponse,
            description: UserMessage_1.Messages.SucessfullyUserVerified
        }
    }),
    __param(0, decorators_1.QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRequest_1.UserVerifyRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Verify", null);
__decorate([
    decorators_1.Get("/", {
        successResponseOptions: {
            model: UserResponse_1.GetAllUsersResponse,
            description: UserMessage_1.Messages.SucessfullyFetchedAllUsers
        }
    }),
    __param(0, decorators_1.QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetAllUsers", null);
__decorate([
    decorators_1.Get("/resend/pin", {
        successResponseOptions: {
            model: common_1.MessageResponse,
            description: "Resend Verification Code"
        }
    }),
    __param(0, decorators_1.QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRequest_1.ResendVerifyCodeRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ResendCode", null);
__decorate([
    decorators_1.Authorized(),
    decorators_1.Get("/active/me", {
        successResponseOptions: {
            model: UserResponse_1.User,
            description: "Resend Verification Code"
        }
    }),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Me", null);
__decorate([
    decorators_1.Post("/register", {
        successResponseOptions: {
            model: common_1.MessageResponse,
            description: UserMessage_1.Messages.SuccessfullyUserRegister
        }
    }),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRequest_1.UserRegistrationRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Register", null);
__decorate([
    decorators_1.Post("/login", {
        successResponseOptions: {
            model: UserResponse_1.GetUserLoginResponse,
            description: UserMessage_1.Messages.SucessfullyLogin
        }
    }),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRequest_1.UserLoginRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Login", null);
__decorate([
    decorators_1.Post("/forgot", {
        successResponseOptions: {
            model: common_1.MessageResponse,
            description: "Forgot Password"
        }
    }),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRequest_1.ResendVerifyCodeRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ForgotPassword", null);
__decorate([
    decorators_1.Delete("/delete", {
        successResponseOptions: {
            model: common_1.MessageResponse,
            description: UserMessage_1.Messages.SucessfullyUserDeleted
        }
    }),
    __param(0, decorators_1.QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRequest_1.DeleteByIdRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "DeleteById", null);
__decorate([
    decorators_1.Authorized(),
    decorators_1.Put("/update", {
        successResponseOptions: {
            model: common_1.MessageResponse,
            description: "Update User"
        }
    }),
    __param(0, routing_controllers_1.Body({ validate: true })), __param(1, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRequest_1.UserUpdateRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateUser", null);
UserController = __decorate([
    routing_controllers_1.JsonController("/user"),
    __metadata("design:paramtypes", [UserService_1.default])
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map