import { Service } from "typedi";
import { UserStatus } from "../../Constrants/enums";
import { ConflictErrorException } from "../../Exception/ConflictException";
import UserRepository from "./UserRepository";
import { DeleteByIdRequest, UserLoginRequest, UserRegistrationRequest, UserVerifyRequest } from "./UserRequest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import random from "random-number"
import UserModel from "./UserModel";
import { UserInterface } from "./UserInterface";
import { BadRequestException, CustomException, NotFoundException, ResponseCode, ResponseOrigin } from "../../exception";
import { GetAllUsersResponse, LoginResponse, User } from "./UserResponse";
import { plainToClass } from "class-transformer";
import { Messages } from "./UserMessage";
import { SharedMessages } from "../Shared/SharedMessages";
@Service()
export default class UserService {
    SaltRound = 10;
    PinCodeExpiryHours = 2;
    constructor(private _userRepository: UserRepository) { }
    private async _generatePinCode(): Promise<number> {
        const pin: number = random({ integer: true, max: 9999, min: 1000, });
        return pin;
    }
    private async _getPinCodeExpiry() {
        let pincodeExpiry = new Date();
        pincodeExpiry.setHours(pincodeExpiry.getHours() + this.PinCodeExpiryHours);
        return pincodeExpiry.getTime();
    }
    private async _generateToken(user): Promise<String> {
        return jwt.sign({ _id: user.Id }, process.env.SECRET_KEY);
    }
    public async GetAllUsers(): Promise<User[] | []> {
        try {
            let Users: User[] = await this._userRepository.find({});
            return Users;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
    public async Register(data: UserRegistrationRequest): Promise<{ Id: number }> {
        try {
            let user = await this._userRepository.findOne({ email: data.email });
            if (user && user.UserStatus !== UserStatus.Unverified) {
                throw new CustomException(Messages.ExceptionAlreadyExists, ResponseCode.CONFLICT, ResponseOrigin.INTERNALSERVER)
            } else if (user) {
                const updatedUser = await this._userRepository.findByIdAndUpdate(user.Id, {
                    Pincode: await this._generatePinCode(),
                    ExpiryPincode: await this._getPinCodeExpiry(),
                    UserStatus: UserStatus.Unverified
                })
                return { Id: user.Id }
            } else {
                const hash: string = await bcrypt.hash(data.password, this.SaltRound);
                let userModel: UserInterface = { Email: data.email, Password: hash, ExpiryPincode: await this._getPinCodeExpiry(), Pincode: await this._generatePinCode() };
                userModel.Email = data.email;
                userModel.Password = hash;
                userModel.ExpiryPincode = await this._getPinCodeExpiry();
                userModel.Pincode = await this._generatePinCode();
                userModel.UserStatus = UserStatus.Unverified;
                let userData: UserModel = await this._userRepository.save(userModel);

                return { Id: userData.Id }
            }
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
    public async Login(data: UserLoginRequest): Promise<LoginResponse> {
        try {
            let user = await this._userRepository.findOne({ email: data.email });
            if (!user) {
                throw new NotFoundException();
            }
            const hashCompairision: boolean = await bcrypt.compare(data.password, user.Password);
            if (!hashCompairision) {
                throw new CustomException(Messages.ExceptionValidPassword, ResponseCode.UNAUTHORIZED, ResponseOrigin.INTERNALSERVER)
            }
            let Token = await this._generateToken(user);
            return { Token: Token, User: await plainToClass(User, user) }
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
    public async Verify(data: UserVerifyRequest): Promise<LoginResponse> {
        try {
            let user = await this._userRepository.findOne({ email: data.email });
            if (!user) {
                throw new NotFoundException();
            }
            if (user.UserStatus !== UserStatus.Unverified) {
                throw new CustomException(Messages.ExceptionAlreadyVerified, ResponseCode.CONFLICT, ResponseOrigin.INTERNALSERVER)
            }
            if ((new Date() < new Date(user.ExpiryPincode))) {
                const updatedUser = await this._userRepository.findByIdAndUpdate(user.Id, {
                    Pincode: null,
                    ExpiryPincode: null,
                    UserStatus: UserStatus.Active
                })
                let Token = await this._generateToken(updatedUser);
                return { Token: Token, User: await plainToClass(User, user) }
            } else {
                throw new CustomException(Messages.ExceptionVerficationPinCodeExpired, ResponseCode.FORBIDDEN, ResponseOrigin.INTERNALSERVER);
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
}