"use strict";
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
const sequelize_typescript_1 = require("sequelize-typescript");
const userModel_1 = __importDefault(require("../features/user/userModel"));
const sequelize = new sequelize_typescript_1.Sequelize('basecode', 'root', '', {
    repositoryMode: true,
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    models: [userModel_1.default]
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}))();
console.log(`${__dirname}/../../../src/feautures/user/UserModel.ts`, "dire");
// sequelize.addModels([`${__dirname}/../../../src/feautures/User/UserModel.ts`]);
// sequelize.addModels([UserModel]);
sequelize.sync();
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map