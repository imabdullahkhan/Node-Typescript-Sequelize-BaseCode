import { Model, Repository } from "sequelize-typescript";
import { Includeable } from "sequelize/types";
import sequelize from "../../Database-loader/sequelize";
import {
  FindByIdRequestParams,
  FindOneRequestParams,
  FindRequestParams,
} from "./BaseRequestParams";
import { PaginationRequestParams } from "./Interface";
export class BaseRepository<T extends Model> {
  public Repository: Repository<T>;
  public model: Model<T, any>;
  constructor(model) {
    this.Repository = sequelize.getRepository(model);
    this.model = model;
  }
  private async ConvertingSequlizeToJSON(model) {
    return await model.toJSON();
  }
  public async findOne(requestParams: FindOneRequestParams): Promise<T> {
    const { whereParams, raw, include } = requestParams;
    return await this.Repository.findOne<T>({
      where: whereParams,
      raw: raw,
      nest: true,
      include: include,
    });
  }
  public async save(modal): Promise<T> {
    return (await this.Repository.create(modal, { raw: true })).get({
      plain: true,
    });
  }
  public async bulkCreate(modal): Promise<T> {
    return await this.Repository.bulkCreate(modal);
  }
  public async findByIdAndUpdate(Id: number, data): Promise<boolean> {
    let updated = await this.Repository.update(data, { where: { Id: Id } });
    if (updated.length > 0) {
      if (updated[0]) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  public async updateMany(whereParams, data): Promise<T> {
    return await this.Repository.update(data, { where: whereParams });
  }
  public async findByIdAndRemove(Id: number): Promise<number> {
    return await this.Repository.destroy({ where: { Id: Id } });
  }
  public async find(requstParmas: FindRequestParams): Promise<T[]> {
    const { paginationParams, whereParams, raw, group, include } = requstParmas;
    let FindOption = {};
    if (paginationParams) {
      FindOption = {
        limit: paginationParams.limit,
        offset: paginationParams.page,
      };
    }
    if (group.length > 0) {
      FindOption = { ...FindOption, group: group };
    }
    let Response = await this.Repository.findAll({
      where: whereParams,
      raw,
      ...FindOption,
      nest: true,
      include: include,
    });
    if (!raw) {
      let ConvertedModelToJSONData = [];
      for (let data of Response) {
        ConvertedModelToJSONData.push(
          await this.ConvertingSequlizeToJSON(data)
        );
      }
      return ConvertedModelToJSONData;
    } else {
      return Response;
    }

    // if (!paginationParams) {
    // } else {
    //     return await this.Repository.findAll({ where: whereParams, raw: raw, group: group, limit: paginationParams.limit, offset: paginationParams.page, nest: true, include: include });
    // }
  }
  public async findAndCountAll(
    requstParmas: FindRequestParams
  ): Promise<{ count: number; rows: T[] } | any> {
    const { paginationParams, whereParams, raw, group, include } = requstParmas;
    let FindOption = {};
    if (paginationParams) {
      FindOption = {
        limit: paginationParams.limit,
        offset: paginationParams.page,
      };
    }
    if (group.length > 0) {
      FindOption = { ...FindOption, group: group };
    }

    let Response = await this.Repository.findAndCountAll({
      where: whereParams,
      raw,
      ...FindOption,
      nest: true,
      include: include,
    });
    if (!raw) {
      let ConvertedModelToJSONData = [];
      for (let data of Response) {
        ConvertedModelToJSONData.push(
          await this.ConvertingSequlizeToJSON(data)
        );
      }
      return ConvertedModelToJSONData;
    } else {
      return Response;
    }

    // if (!paginationParams) {
    // } else {
    //     return await this.Repository.findAll({ where: whereParams, raw: raw, group: group, limit: paginationParams.limit, offset: paginationParams.page, nest: true, include: include });
    // }
  }
  public async findOneAndUpdate(
    whereParams,
    data,
    raw = true
  ): Promise<boolean> {
    let updated: any = await this.Repository.update(data, {
      where: whereParams,
    });
    console.log(updated[0], " updated.length");
    if (updated.length > 0) {
      if (updated[0]) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  public async findById(Id, requestParams: FindByIdRequestParams = null): Promise<T> {
    return await this.Repository.findOne({
      where: { Id: Id },
      nest: true,
      include: requestParams?.include?.length ? requestParams.include : [],
      raw: true,
    });
  }
}
