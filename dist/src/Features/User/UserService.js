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
const typedi_1 = require("typedi");
const enums_1 = require("../../Constrants/enums");
const UserRepository_1 = __importDefault(require("./UserRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const random_number_1 = __importDefault(require("random-number"));
const exception_1 = require("../../exception");
const UserResponse_1 = require("./UserResponse");
const class_transformer_1 = require("class-transformer");
const UserMessage_1 = require("./UserMessage");
const randomstring_1 = __importDefault(require("randomstring"));
let UserService = class UserService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
        this.SaltRound = 10;
        this.PinCodeExpiryHours = 2;
    }
    _generatePinCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const pin = random_number_1.default({ integer: true, max: 9999, min: 1000 });
            return pin;
        });
    }
    _getPinCodeExpiry() {
        return __awaiter(this, void 0, void 0, function* () {
            let pincodeExpiry = new Date();
            pincodeExpiry.setHours(pincodeExpiry.getHours() + this.PinCodeExpiryHours);
            return pincodeExpiry.getTime();
        });
    }
    _generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ Id: user.Id }, process.env.SECRET_KEY);
        });
    }
    GetAllUsers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let paginationParams = {};
                if (!data.page && !data.limit) {
                    data.page = 1;
                    data.limit = 10;
                }
                if (data.limit !== -1) {
                    paginationParams.limit = data.limit;
                    paginationParams.page = (data.page || 1) * data.limit - data.limit;
                }
                let Users = yield this._userRepository.find({
                    paginationParams
                });
                return yield class_transformer_1.plainToClass(UserResponse_1.User, Users);
            }
            catch (e) {
                throw new exception_1.BadRequestException(e);
            }
        });
    }
    Register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._userRepository.findOne({
                    whereParams: { email: data.email },
                });
                if (user && user.UserStatus !== enums_1.UserStatus.Unverified) {
                    throw new exception_1.CustomException(UserMessage_1.Messages.ExceptionAlreadyExists, exception_1.ResponseCode.CONFLICT, exception_1.ResponseOrigin.INTERNALSERVER);
                }
                else if (user) {
                    const updatedUser = yield this._userRepository.findByIdAndUpdate(user.Id, {
                        Pincode: yield this._generatePinCode(),
                        ExpiryPincode: yield this._getPinCodeExpiry(),
                        UserStatus: enums_1.UserStatus.Unverified,
                    });
                    return { Id: user.Id };
                }
                else {
                    const hash = yield bcrypt_1.default.hash(data.password, this.SaltRound);
                    let userModel = {
                        Email: data.email,
                        Password: hash,
                        ExpiryPincode: yield this._getPinCodeExpiry(),
                        Pincode: yield this._generatePinCode(),
                    };
                    userModel.Email = data.email;
                    userModel.Password = hash;
                    userModel.ExpiryPincode = yield this._getPinCodeExpiry();
                    userModel.Pincode = yield this._generatePinCode();
                    userModel.UserStatus = enums_1.UserStatus.Unverified;
                    userModel.UserType = data.userType;
                    let userData = yield this._userRepository.save(userModel);
                    return { Id: userData.Id };
                }
            }
            catch (e) {
                throw new exception_1.BadRequestException(e);
            }
        });
    }
    Login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("reched");
                let user = yield this._userRepository.findOne({ whereParams: { email: data.email } });
                if (!user) {
                    throw new exception_1.NotFoundException();
                }
                const hashCompairision = yield bcrypt_1.default.compare(data.password, user.Password);
                if (!hashCompairision) {
                    throw new exception_1.CustomException(UserMessage_1.Messages.ExceptionValidPassword, exception_1.ResponseCode.UNAUTHORIZED, exception_1.ResponseOrigin.INTERNALSERVER);
                }
                let Token = yield this._generateToken(user);
                return { Token: Token, User: yield class_transformer_1.plainToClass(UserResponse_1.User, user) };
            }
            catch (e) {
                throw new exception_1.BadRequestException(e);
            }
        });
    }
    Verify(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._userRepository.findOne({ whereParams: { email: data.email } });
                if (!user) {
                    throw new exception_1.NotFoundException();
                }
                if (user.UserStatus !== enums_1.UserStatus.Unverified) {
                    throw new exception_1.CustomException(UserMessage_1.Messages.ExceptionAlreadyVerified, exception_1.ResponseCode.CONFLICT, exception_1.ResponseOrigin.INTERNALSERVER);
                }
                if (new Date() < new Date(user.ExpiryPincode)) {
                    const updatedUser = yield this._userRepository.findByIdAndUpdate(user.Id, {
                        Pincode: null,
                        ExpiryPincode: null,
                        UserStatus: enums_1.UserStatus.Active,
                    });
                    let Token = yield this._generateToken(updatedUser);
                    return { Token: Token, User: yield class_transformer_1.plainToClass(UserResponse_1.User, user) };
                }
                else {
                    throw new exception_1.CustomException(UserMessage_1.Messages.ExceptionVerficationPinCodeExpired, exception_1.ResponseCode.FORBIDDEN, exception_1.ResponseOrigin.INTERNALSERVER);
                }
            }
            catch (e) {
                throw new exception_1.BadRequestException(e);
            }
        });
    }
    DeleteOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepository.findByIdAndRemove(data.Id);
                if (!user) {
                    throw new exception_1.NotFoundException();
                }
                return UserMessage_1.Messages.SucessfullyUserDeleted;
            }
            catch (e) {
                throw new exception_1.BadRequestException(e);
            }
        });
    }
    ResendVerifyCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            user = yield this._userRepository.findOne({ whereParams: { email: data.email } });
            if (!user) {
                throw new exception_1.NotFoundException();
            }
            else if (user.UserStatus === enums_1.UserStatus.Active) {
                throw new exception_1.CustomException(UserMessage_1.Messages.ExceptionAlreadyVerified, exception_1.ResponseCode.CONFLICT, exception_1.ResponseOrigin.INTERNALSERVER);
            }
            else {
                try {
                    const updatedUser = yield this._userRepository.findByIdAndUpdate(user.Id, {
                        Pincode: yield this._generatePinCode(),
                        ExpiryPincode: yield this._getPinCodeExpiry(),
                        UserStatus: enums_1.UserStatus.Unverified,
                    });
                    return { Id: user.Id };
                }
                catch (e) {
                    throw new exception_1.BadRequestException(e);
                }
            }
        });
    }
    ForgotPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this._userRepository.findOne({
                whereParams: { Email: data.email },
            });
            if (!user) {
                throw new exception_1.NotFoundException();
            }
            if (user.UserStatus === enums_1.UserStatus.Inactive) {
                throw new exception_1.CustomException("User is inactive", exception_1.ResponseCode.UNPROCESSABLE, exception_1.ResponseOrigin.INTERNALSERVER);
            }
            // let newPassword = "string";
            let newPassword = randomstring_1.default.generate(8);
            try {
                const hash = yield bcrypt_1.default.hash(newPassword, this.SaltRound);
                yield this._userRepository.findByIdAndUpdate(user.Id, {
                    Password: hash,
                    SystemGeneratedPassword: 1,
                });
                if (user.Email) {
                    // await EmailHelper.SendVerificationCodeMail(user.email, { Code: newPassword });
                }
                return "Email Sent! Please Check Your New Password";
            }
            catch (e) {
                throw new exception_1.FatalErrorException();
            }
        });
    }
    UpdateUser(data, Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                let response = yield this._userRepository.findByIdAndUpdate(Id, data);
                return "User Updated Successfully";
            }
            catch (e) {
                console.log(e);
                throw new exception_1.FatalErrorException();
            }
        });
    }
    me(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return class_transformer_1.plainToClass(UserResponse_1.User, data);
        });
    }
};
UserService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [UserRepository_1.default])
], UserService);
exports.default = UserService;
//# sourceMappingURL=UserService.js.map