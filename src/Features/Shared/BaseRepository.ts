import { Model, Repository } from "sequelize-typescript";
import sequelize from "../../Database-loader/sequelize";
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
        return await this.Repository.update(data, {where :{Id : Id}});
    }
    public async updateMany(whereParams, data): Promise<T> {
        return await this.Repository.update(data, { where: whereParams });
    }
    public async findByIdAndRemove(Id:number) :Promise<number> {
        return await this.Repository.destroy({where : {Id :Id}});
    }
    public async find(whereParams, raw = true) :Promise<T[]> {
        return await this.Repository.findAll({ where: whereParams, raw: raw });
    }
}
