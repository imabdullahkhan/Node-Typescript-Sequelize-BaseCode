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
    ConvertingSequlizeToJSON(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.toJSON();
        });
    }
    findOne(requestParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { whereParams, raw, include } = requestParams;
            return yield this.Repository.findOne({
                where: whereParams,
                raw: raw,
                nest: true,
                include: include,
            });
        });
    }
    save(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.Repository.create(modal, { raw: true })).get({
                plain: true,
            });
        });
    }
    bulkCreate(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.bulkCreate(modal);
        });
    }
    findByIdAndUpdate(Id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = yield this.Repository.update(data, { where: { Id: Id } });
            if (updated.length > 0) {
                if (updated[0]) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
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
    find(requstParmas) {
        return __awaiter(this, void 0, void 0, function* () {
            const { paginationParams, whereParams, raw, group, include } = requstParmas;
            let FindOption = {};
            if (paginationParams) {
                FindOption = {
                    limit: paginationParams.limit,
                    offset: paginationParams.page,
                };
            }
            if (group.length > 0) {
                FindOption = Object.assign(Object.assign({}, FindOption), { group: group });
            }
            let Response = yield this.Repository.findAll(Object.assign(Object.assign({ where: whereParams, raw }, FindOption), { nest: true, include: include }));
            if (!raw) {
                let ConvertedModelToJSONData = [];
                for (let data of Response) {
                    ConvertedModelToJSONData.push(yield this.ConvertingSequlizeToJSON(data));
                }
                return ConvertedModelToJSONData;
            }
            else {
                return Response;
            }
            // if (!paginationParams) {
            // } else {
            //     return await this.Repository.findAll({ where: whereParams, raw: raw, group: group, limit: paginationParams.limit, offset: paginationParams.page, nest: true, include: include });
            // }
        });
    }
    findAndCountAll(requstParmas) {
        return __awaiter(this, void 0, void 0, function* () {
            const { paginationParams, whereParams, raw, group, include } = requstParmas;
            let FindOption = {};
            if (paginationParams) {
                FindOption = {
                    limit: paginationParams.limit,
                    offset: paginationParams.page,
                };
            }
            if (group.length > 0) {
                FindOption = Object.assign(Object.assign({}, FindOption), { group: group });
            }
            let Response = yield this.Repository.findAndCountAll(Object.assign(Object.assign({ where: whereParams, raw }, FindOption), { nest: true, include: include }));
            if (!raw) {
                let ConvertedModelToJSONData = [];
                for (let data of Response) {
                    ConvertedModelToJSONData.push(yield this.ConvertingSequlizeToJSON(data));
                }
                return ConvertedModelToJSONData;
            }
            else {
                return Response;
            }
            // if (!paginationParams) {
            // } else {
            //     return await this.Repository.findAll({ where: whereParams, raw: raw, group: group, limit: paginationParams.limit, offset: paginationParams.page, nest: true, include: include });
            // }
        });
    }
    findOneAndUpdate(whereParams, data, raw = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = yield this.Repository.update(data, {
                where: whereParams,
            });
            console.log(updated[0], " updated.length");
            if (updated.length > 0) {
                if (updated[0]) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        });
    }
    findById(Id, requestParams = null) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.findOne({
                where: { Id: Id },
                nest: true,
                include: ((_a = requestParams === null || requestParams === void 0 ? void 0 : requestParams.include) === null || _a === void 0 ? void 0 : _a.length) ? requestParams.include : [],
                raw: true,
            });
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map