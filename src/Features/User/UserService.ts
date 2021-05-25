import { Service } from "typedi";
import { UserStatus } from "../../Constrants/enums";
import { ConflictErrorException } from "../../Exception/ConflictException";
import UserRepository from "./UserRepository";
import {
  DeleteByIdRequest,
  ResendVerifyCodeRequest,
  UserLoginRequest,
  UserRegistrationRequest,
  UserVerifyRequest,
} from "./UserRequest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import random from "random-number";
import UserModel from "./UserModel";
import { UserInterface } from "./UserInterface";
import {
  BadRequestException,
  CustomException,
  FatalErrorException,
  NotFoundException,
  ResponseCode,
  ResponseOrigin,
} from "../../exception";
import { GetAllUsersResponse, LoginResponse, User } from "./UserResponse";
import { plainToClass } from "class-transformer";
import { Messages } from "./UserMessage";
import { SharedMessages } from "../Shared/SharedMessages";
import { PaginationParams } from "../../Requests/common";
import { PaginationRequestParams } from "../Shared/Interface";
import randomstring from "randomstring";
@Service()
export default class UserService {
  SaltRound = 10;
  PinCodeExpiryHours = 2;
  constructor(private _userRepository: UserRepository) {}
  private async _generatePinCode(): Promise<number> {
    const pin: number = random({ integer: true, max: 9999, min: 1000 });
    return pin;
  }
  private async _getPinCodeExpiry() {
    let pincodeExpiry = new Date();
    pincodeExpiry.setHours(pincodeExpiry.getHours() + this.PinCodeExpiryHours);
    return pincodeExpiry.getTime();
  }
  private async _generateToken(user): Promise<String> {
    return jwt.sign({ Id: user.Id }, process.env.SECRET_KEY);
  }
  public async GetAllUsers(data: PaginationParams): Promise<User[] | []> {
    try {
      let paginationParams = {} as PaginationParams;
      if (!data.page && !data.limit) {
        data.page = 1;
        data.limit = 10;
      }

      if (data.limit !== -1) {
        paginationParams.limit = data.limit;
        paginationParams.page = (data.page || 1) * data.limit - data.limit;
      }
      let Users: User[] = await this._userRepository.find({
        paginationParams
      });
      return await plainToClass(User, Users);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async Register(
    data: UserRegistrationRequest
  ): Promise<{ Id: number }> {
    try {
      let user = await this._userRepository.findOne({
        whereParams: { email: data.email },
      });
      if (user && user.UserStatus !== UserStatus.Unverified) {
        throw new CustomException(
          Messages.ExceptionAlreadyExists,
          ResponseCode.CONFLICT,
          ResponseOrigin.INTERNALSERVER
        );
      } else if (user) {
        const updatedUser = await this._userRepository.findByIdAndUpdate(
          user.Id,
          {
            Pincode: await this._generatePinCode(),
            ExpiryPincode: await this._getPinCodeExpiry(),
            UserStatus: UserStatus.Unverified,
          }
        );
        return { Id: user.Id };
      } else {
        const hash: string = await bcrypt.hash(data.password, this.SaltRound);
        let userModel: UserInterface = {
          Email: data.email,
          Password: hash,
          ExpiryPincode: await this._getPinCodeExpiry(),
          Pincode: await this._generatePinCode(),
        };
        userModel.Email = data.email;
        userModel.Password = hash;
        userModel.ExpiryPincode = await this._getPinCodeExpiry();
        userModel.Pincode = await this._generatePinCode();
        userModel.UserStatus = UserStatus.Unverified;
        userModel.UserType = data.userType;
        let userData: UserModel = await this._userRepository.save(userModel);

        return { Id: userData.Id };
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async Login(data: UserLoginRequest): Promise<LoginResponse> {
    try {
      console.log("reched");
      let user = await this._userRepository.findOne({ whereParams : {  email: data.email } });
      if (!user) {
        throw new NotFoundException();
      }
      const hashCompairision: boolean = await bcrypt.compare(
        data.password,
        user.Password
      );
      if (!hashCompairision) {
        throw new CustomException(
          Messages.ExceptionValidPassword,
          ResponseCode.UNAUTHORIZED,
          ResponseOrigin.INTERNALSERVER
        );
      }
      let Token = await this._generateToken(user);
      return { Token: Token, User: await plainToClass(User, user) };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async Verify(data: UserVerifyRequest): Promise<LoginResponse> {
    try {
      let user = await this._userRepository.findOne({ whereParams: {  email: data.email  }});
      if (!user) {
        throw new NotFoundException();
      }
      if (user.UserStatus !== UserStatus.Unverified) {
        throw new CustomException(
          Messages.ExceptionAlreadyVerified,
          ResponseCode.CONFLICT,
          ResponseOrigin.INTERNALSERVER
        );
      }
      if (new Date() < new Date(user.ExpiryPincode)) {
        const updatedUser = await this._userRepository.findByIdAndUpdate(
          user.Id,
          {
            Pincode: null,
            ExpiryPincode: null,
            UserStatus: UserStatus.Active,
          }
        );
        let Token = await this._generateToken(updatedUser);
        return { Token: Token, User: await plainToClass(User, user) };
      } else {
        throw new CustomException(
          Messages.ExceptionVerficationPinCodeExpired,
          ResponseCode.FORBIDDEN,
          ResponseOrigin.INTERNALSERVER
        );
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async DeleteOne(data: DeleteByIdRequest): Promise<string> {
    try {
      const user = await this._userRepository.findByIdAndRemove(data.Id);
      if (!user) {
        throw new NotFoundException();
      }
      return Messages.SucessfullyUserDeleted;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async ResendVerifyCode(
    data: ResendVerifyCodeRequest
  ): Promise<{ Id: number }> {
    let user;
    user = await this._userRepository.findOne({ whereParams : { email: data.email } });
    if (!user) {
      throw new NotFoundException();
    } else if (user.UserStatus === UserStatus.Active) {
      throw new CustomException(
        Messages.ExceptionAlreadyVerified,
        ResponseCode.CONFLICT,
        ResponseOrigin.INTERNALSERVER
      );
    } else {
      try {
        const updatedUser = await this._userRepository.findByIdAndUpdate(
          user.Id,
          {
            Pincode: await this._generatePinCode(),
            ExpiryPincode: await this._getPinCodeExpiry(),
            UserStatus: UserStatus.Unverified,
          }
        );
        return { Id: user.Id };
      } catch (e) {
        throw new BadRequestException(e);
      }
    }
  }
  public async ForgotPassword(data: ResendVerifyCodeRequest): Promise<String> {
    let user = await this._userRepository.findOne({
      whereParams: { Email: data.email },
    });
    if (!user) {
      throw new NotFoundException();
    }
    if (user.UserStatus === UserStatus.Inactive) {
      throw new CustomException(
        "User is inactive",
        ResponseCode.UNPROCESSABLE,
        ResponseOrigin.INTERNALSERVER
      );
    }
    // let newPassword = "string";
    let newPassword = randomstring.generate(8);
    try {
      const hash = await bcrypt.hash(newPassword, this.SaltRound);
      await this._userRepository.findByIdAndUpdate(user.Id, {
        Password: hash,
        SystemGeneratedPassword: 1,
      });
      if (user.Email) {
        // await EmailHelper.SendVerificationCodeMail(user.email, { Code: newPassword });
      }
      return "Email Sent! Please Check Your New Password";
    } catch (e) {
      throw new FatalErrorException();
    }
  }
  public async UpdateUser(data, Id: number): Promise<String> {
    try {
      console.log(data);
      let response = await this._userRepository.findByIdAndUpdate(Id, data);
      return "User Updated Successfully";
    } catch (e) {
      console.log(e);
      throw new FatalErrorException();
    }
  }
  public async me(data: User): Promise<User> {
    return plainToClass(User, data);
  }
}
