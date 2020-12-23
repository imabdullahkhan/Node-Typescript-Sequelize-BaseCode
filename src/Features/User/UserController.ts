import { JsonController, Body, QueryParam, CurrentUser } from "routing-controllers";
import UserService from "./UserService";
import { Put, Post, Get, QueryParams, Authorized, Param, Delete } from "../../Swagger-rc/decorators";
import { UserRegistrationRequest, UserVerifyRequest, ResendVerifyCodeRequest, UserLoginRequest, ChangePasswordRequest, UserUpdateRequest, FindUserRequest, FacebookLoginRequest, DeleteByIdRequest } from "./UserRequest";
import { DataResponse, MessageResponse } from "../../Response/common";
import { GetAllUsersResponse, GetUserLoginResponse, LoginResponse, User } from "./UserResponse";
import { Messages } from "./UserMessage";
import { PaginationParams } from "../../Requests/common";

@JsonController("/user")
class UserController {
    constructor(private _userService: UserService) { }
    @Get("/verify", {
        successResponseOptions: {
            model: GetUserLoginResponse,
            description: Messages.SucessfullyUserVerified
        }
    })
    async Verify(@QueryParams() data: UserVerifyRequest): Promise<DataResponse<LoginResponse>> {
        return new DataResponse<LoginResponse>(await this._userService.Verify(data), Messages.SucessfullyUserVerified);
    }

    @Get("/", {
        successResponseOptions: {
            model: GetAllUsersResponse,
            description: Messages.SucessfullyFetchedAllUsers
        }
    })
    async GetAllUsers(@QueryParams() paginationParams: PaginationParams): Promise<DataResponse<User[]>> {
        return new DataResponse<User[]>(await this._userService.GetAllUsers(paginationParams), Messages.SucessfullyFetchedAllUsers);
    }
    @Get("/resend/pin", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Resend Verification Code"
        }
    })
    async ResendCode(@QueryParams() data: ResendVerifyCodeRequest): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.ResendVerifyCode(data));
    }
    @Authorized()
    @Get("/active/me", {
        successResponseOptions: {
            model: User,
            description: "Resend Verification Code"
        }
    })
    async Me(@CurrentUser({ required: true }) user): Promise<DataResponse<User>> {
        return new DataResponse<User>(await this._userService.me(user), " User Data Found");
    }
    @Post("/register", {
        successResponseOptions: {
            model: MessageResponse,
            description: Messages.SuccessfullyUserRegister
        }
    })
    async Register(@Body({ validate: true }) user: UserRegistrationRequest): Promise<DataResponse<{Id:number}>> {
        return new DataResponse(await this._userService.Register(user), Messages.SuccessfullyUserRegister)
    }
    @Post("/login", {
        successResponseOptions: {
            model: GetUserLoginResponse,
            description: Messages.SucessfullyLogin
        }
    })
    async Login(@Body({ validate: true }) user: UserLoginRequest): Promise<DataResponse<LoginResponse>> {
        return new DataResponse<LoginResponse>(await this._userService.Login(user), Messages.SucessfullyLogin);
    }
    @Post("/forgot", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Forgot Password"
        }
    })
    async ForgotPassword(@Body({ validate: true }) user: ResendVerifyCodeRequest): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.ForgotPassword(user));
    }
    @Delete("/delete", {
        successResponseOptions: {
            model: MessageResponse,
            description: Messages.SucessfullyUserDeleted
        }
    })
    async DeleteById(@QueryParams() data: DeleteByIdRequest): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.DeleteOne(data));
    }
    @Authorized()
    @Put("/update", {
        successResponseOptions: {
            model: MessageResponse,
            description: "Update User"
        }
    })
    async UpdateUser(@Body({ validate: true }) data: UserUpdateRequest, @CurrentUser({ required: true }) user): Promise<MessageResponse> {
        return new MessageResponse(await this._userService.UpdateUser(data, user.Id));
    }
   
}
export default UserController;
