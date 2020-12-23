import { Transform } from "class-transformer";
import { IsEnum, IsIn, IsInt, IsString } from "class-validator";


// export class UpdatePhoneProfileSetting {
//     @IsString()
//     user :string
//     @IsEnum(ProfileSettings)
//     profileSetting : number
// }
// export class GeneralSocketRequest {
//     @IsString()
//     user :string
// }
// export class SendPhoneBatterRequest {
//     @IsString()
//     user:string
//     @IsInt()
//     @Transform((val)=>Number(val))
//     battery:number
//     @IsString()
//     socketId :string
// }
// export class GetPhoneContactsRequest {
//     @IsString()
//     user:string
//     @IsInt()
//     @Transform((val)=>Number(val))
//     page:number
//     @IsInt()
//     @Transform((val)=>Number(val))
//     limit:number
// }