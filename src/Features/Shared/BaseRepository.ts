import { Model, Repository } from "sequelize-typescript";
import sequelize from "../../Database-loader/sequelize";
import { PaginationRequestParams } from "./Interface";
export class BaseRepository<T extends Model> {
    public Repository: Repository<T>;
    public model: Model<T, any>;
    constructor(model) {
        this.Repository = sequelize.getRepository(model);
        this.model = model;
    }
    public async findOne(whereParams, raw = true): Promise<T> {
        return await this.Repository.findOne<T>({ where: whereParams, raw: raw });
    }
    public async save(modal): Promise<T> {
        return (await this.Repository.create(modal, { raw: true })).get({ plain: true })
    }
    public async findByIdAndUpdate(Id: number, data): Promise<T> {
        return await this.Repository.update(data, { where: { Id: Id } });
    }
    public async updateMany(whereParams, data): Promise<T> {
        return await this.Repository.update(data, { where: whereParams });
    }
    public async findByIdAndRemove(Id: number): Promise<number> {
        return await this.Repository.destroy({ where: { Id: Id } });
    }
    public async find(whereParams = {}, paginationParams?: PaginationRequestParams, raw = true): Promise<T[]> {
        if (!paginationParams) {
            return await this.Repository.findAll({ where: whereParams, raw: raw });
        } else {
            return await this.Repository.findAll({ where: whereParams, raw: raw, limit: paginationParams.limit, offset: paginationParams.page });
        }
    }
    public async findOneAndUpdate(whereParams, data, raw = true): Promise<T> {
        return await this.Repository.update(data, { where: whereParams }).get({ plain: true });
    }
    public async findById(Id): Promise<T> {
        return await this.Repository.findOne({ where: { Id: Id } , raw : true });
    }
}
