import { JsonController, Body, QueryParam, CurrentUser } from "routing-controllers";
import UserService from "./UserService";
import { Put, Post, Get, QueryParams, Authorized, Param, Delete } from "../../Swagger-rc/decorators";
import { UserRegistrationRequest, UserVerifyRequest, ResendVerifyCodeRequest, UserLoginRequest, ChangePasswordRequest, UserUpdateRequest, FindUserRequest, FacebookLoginRequest, DeleteByIdRequest } from "./UserRequest";
import { DataResponse, MessageResponse } from "../../Response/common";
import { GetAllUsersResponse, GetUserLoginResponse, LoginResponse, User } from "./UserResponse";
import { Messages } from "./UserMessage";

@JsonController("/user")
class UserController {
    constructor(private _userService: UserService) { }
    @Post("/register", {
        successResponseOptions: {
            model: MessageResponse,
            description: Messages.SuccessfullyUserRegister
        }
    })
    async Register(@Body({ validate: true }) user: UserRegistrationRequest): Promise<MessageResponse> {
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
    @Get("/verify", {
        successResponseOptions: {
            model: GetUserLoginResponse,
            description: Messages.SucessfullyUserVerified
        }
    })
    async Verify(@QueryParams() data: UserVerifyRequest): Promise<DataResponse<LoginResponse>> {
        return new DataResponse<LoginResponse>(await this._userService.Verify(data), Messages.SucessfullyUserVerified);
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
    @Get("/all", {
        successResponseOptions: {
            model: GetAllUsersResponse,
            description: Messages.SucessfullyFetchedAllUsers
        }
    })
    async GetAllUsers(): Promise<DataResponse<User[]>> {
        return new DataResponse<User[]>(await this._userService.GetAllUsers(),Messages.SucessfullyFetchedAllUsers);
    }

}
export default UserController;
