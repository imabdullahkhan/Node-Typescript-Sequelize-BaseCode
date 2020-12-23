import { IsOptional, IsString, IsInt, Min } from "class-validator";
import { Transform } from "class-transformer";
import { PaginationRequestParams } from "../Features/Shared/Interface";

export class SearchRequest {
    @IsOptional()
    @IsString()
    search:string;
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    @Min(1)
    page: number;
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    limit: number;
}
export class PaginationParams implements PaginationRequestParams {
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    @Min(1)
    page: number;
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    limit: number;
}