import { BaseRepository } from "../Shared/BaseRepository";
import UserModel from "./UserModel";

export default class UserRepository extends BaseRepository<UserModel> {
    constructor() {
        super(UserModel);
    }
}