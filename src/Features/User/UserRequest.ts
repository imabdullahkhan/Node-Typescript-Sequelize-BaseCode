import { IsEmail, IsString, Min, Max, Length, IsOptional, IsBoolean, IsNumber, ValidateNested, IsEnum, IsArray, IsDate, IsInt } from "class-validator";
import { UserStatus } from "../../Constrants/enums";
import { Type, Exclude, Transform } from "class-transformer";

export class UserRegistrationRequest {
    @IsEmail()
    email: string
    @IsString()
    @Length(6, 14)
    password: string
    @IsInt()
    userType:number

}

export class UserLoginRequest {
    @IsEmail()
    @IsOptional()
    email: string
    @IsString()
    @Length(6, 14)
    password: string
}
export class UserVerifyRequest {
    @IsEmail()
    @IsOptional()
    email: string
    @IsString()
    pin: string
}
export class DeleteByIdRequest {
    @IsInt()
    @Transform((val)=>Number(val))
    Id: number
}

export class ResendVerifyCodeRequest {
    @IsEmail()
    @IsOptional()
    email: string
}
export class ChangePasswordRequest {
    @IsString()
    password: string
    @IsString()
    newPassword: string
}


export class UserUpdateRequest {
    @IsOptional()
    @IsString()
    Name: string
    @IsOptional()
    @IsString()
    ProfileImage: number;

}

export class FindUserRequest {
    @IsOptional()
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    phoneNumber: string;
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsEnum(UserStatus, { each: true })
    @IsInt()
    status: UserStatus;

    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    @Min(1)
    age: number;



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


export class FacebookLoginRequest {

    @IsString()
    accessToken: string;

}




