"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../Shared/BaseRepository");
const UserModel_1 = __importDefault(require("./UserModel"));
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(UserModel_1.default);
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map