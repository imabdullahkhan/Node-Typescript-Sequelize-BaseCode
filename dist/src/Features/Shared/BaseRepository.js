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
exports.BaseRepository = void 0;
const sequelize_1 = __importDefault(require("../../Database-loader/sequelize"));
class BaseRepository {
    constructor(model) {
        this.Repository = sequelize_1.default.getRepository(model);
        this.model = model;
    }
    findOne(whereParams, raw = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.findOne({ where: whereParams, raw: raw });
        });
    }
    save(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.Repository.create(modal, { raw: true })).get({ plain: true });
        });
    }
    findByIdAndUpdate(Id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.update(data, { where: { Id: Id } });
        });
    }
    updateMany(whereParams, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.update(data, { where: whereParams });
        });
    }
    findByIdAndRemove(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.destroy({ where: { Id: Id } });
        });
    }
    find(whereParams, raw = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.findAll({ where: whereParams, raw: raw });
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map