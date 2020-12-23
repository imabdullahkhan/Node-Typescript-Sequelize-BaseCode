import { UnAuthorizedException } from "../exception";
import jwt from "jsonwebtoken";
import UserModel from "../Features/User/UserModel";
import * as redis from "redis";
import { SOCKET_ID_KEY, USER_ID_KEY } from "./SocketConstants";
console.log(process.env.REDISCLOUD_URL);
const redisClient = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true });
export async function SetUserIdBySocketId(socketId, user) {
    return new Promise((resolve, reject) => {
        redisClient.set(SOCKET_ID_KEY + socketId, user._id, (err, rep) => {
            if (err) reject(err);
            resolve(true);
        });
    });
}

export async function SetSocketIdByUserId(socketId, userId) {
    let socketIds: Array<string> = await GetSocketIdsByUserId(userId);
    if (socketIds && socketIds.length) {
        socketIds.push(socketId);
    } else {
        socketIds = [socketId];
    }
    return new Promise((resolve, reject) => {
        redisClient.set(USER_ID_KEY + userId, JSON.stringify(socketIds), (err, rep) => {
            if (err) reject(err);

            resolve(true);
        });
    });
}

export async function SetSocketIdsByUserId(socketIds: Array<string>, userId) {
    return new Promise((resolve, reject) => {
        redisClient.set(USER_ID_KEY + userId, JSON.stringify(socketIds), (err, rep) => {
            if (err) reject(err);

            resolve(true);
        });
    });
}

export function GetUserIdBySocketId(socketId) {
    return new Promise((resolve, reject) => {
        redisClient.get(SOCKET_ID_KEY + socketId, (err, rep) => {
            if (err) reject(err);

            resolve(rep);
        });
    });
}

export function GetSocketIdsByUserId(userId): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        redisClient.get(USER_ID_KEY + userId, (err, rep) => {
            if (err) reject(err);
            resolve(JSON.parse(rep));
        });
    });
}

export function RemoveSocketId(socketId) {
    return new Promise((resolve, reject) => {
        redisClient.del(SOCKET_ID_KEY + socketId, (err, rep) => {
            if (err) reject(err);

            resolve(true);
        });
    });
}

export async function RemoveSocketIdFromUserSockets(socketId, userId) {
    let socketIds = await GetSocketIdsByUserId(userId);
    if (socketIds && socketIds.length) {
        socketIds = socketIds.filter((id) => id !== socketId);
        await SetSocketIdsByUserId(socketIds, userId);
    }
}

export function SocketAuthentication(socket: SocketIO.Socket, next) {
    const bearerToken: string = socket.handshake.query.authorization;
    console.log(bearerToken, "SOCKET BEARER");
    if (!bearerToken) {
        return next(new UnAuthorizedException());
    }
    const token = bearerToken.split(" ")[1];
    console.log(token, "===TOKEN===");
    // return jwt.verify(token, process.env.SECRET_KEY, async (err: any, decoded: any) => {
    //     if (err) {
    //         next(new UnAuthorizedException());
    //     }
    //     let user = await UserModel.findById(decoded._id)
    //         .populate("country")
    //         .populate("language")
    //         .populate("religion")
    //         .populate("city")
    //         .lean()
    //         .exec();
    //     if (user) {
    //         user = ConvertBsonIdsToString(user);
    //         await SetUserIdBySocketId(socket.id, user);
    //         await SetSocketIdByUserId(socket.id, user._id);
    //         console.log(user._id, "===USERID===");
    //         next();
    //     } else {
    //         console.log("NO USER FOUND!");
    //         next(new UnAuthorizedException());
    //     }
    // });
}
