import { IsString, IsEmail, IsArray, ValidateNested, IsBoolean, IsEnum, IsNumber, IsInt, Validate } from "class-validator";
import { Exclude, Type } from "class-transformer"
import { UserStatus } from "../../Constrants/enums";
import { UserInterface } from "./UserInterface";
import { CallContext } from "twilio/lib/rest/api/v2010/account/call";



export class User implements UserInterface {
    @IsInt()
    Id: number;
    @IsInt()
    @Exclude()
    Pincode : number;
    @IsInt()
    @Exclude()
    ExpiryPincode : number;
    @IsInt()
    SystemGeneratedPassword : number;
    @IsString()
    Email : string;
    @IsString()
    @Exclude()
    Password : string;
    @IsInt()
    UserStatus : number;
    @IsInt()
    UserType : number;
    @IsString()
    Name : string;
    @IsString()
    ProfileImage : string;
}


export class GetAllUsersResponse{
    @IsArray()
    @ValidateNested({ each: true })
    data: User;
}
export class GetUserLoginResponse {
    @IsString()
    data: string
    @IsInt()
    status: number;
    @IsBoolean()
    success: boolean
    @IsString()
    message: string
}


export class LoginResponse {
    @IsString()
    Token:String
    @Type((val) => User)
    @Validate(() => true)
    User: User;
}

// export class BaseResponse {
//     @IsInt()
//     status: number;
//     @IsBoolean()
//     success: boolean
//     @IsString()
//     message: string
// }
// export class AllUsersResponse extends BaseResponse {
//     @IsArray()
//     @ValidateNested({ each: true })
//     data: User;
// }
// export class UserResponse {
//     @Type((val) => User)
//     @Validate(() => true)
//     data: User;
//     @IsInt()
//     status: number;
//     @IsBoolean()
//     success: boolean
//     @IsString()
//     message: string
// }