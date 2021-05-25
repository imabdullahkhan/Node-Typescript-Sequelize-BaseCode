import { Includeable } from "sequelize/types";
import { PaginationRequestParams } from "./Interface";

export class FindRequestParams{
    whereParams? : any = {}
    include? : Array<Includeable> = []
    paginationParams? : PaginationRequestParams
    raw? : boolean = true
    group? : Array<any> = [];
}
export class FindByIdRequestParams{
    include? : Array<Includeable> = []
    raw? : boolean = true
}


export class FindOneRequestParams  {
    whereParams : any = {}
    include? : Array<Includeable> = []
    raw? : boolean = true
}