"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketAuthentication = exports.RemoveSocketIdFromUserSockets = exports.RemoveSocketId = exports.GetSocketIdsByUserId = exports.GetUserIdBySocketId = exports.SetSocketIdsByUserId = exports.SetSocketIdByUserId = exports.SetUserIdBySocketId = void 0;
const exception_1 = require("../exception");
const redis = __importStar(require("redis"));
const SocketConstants_1 = require("./SocketConstants");
console.log(process.env.REDISCLOUD_URL);
const redisClient = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true });
function SetUserIdBySocketId(socketId, user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            redisClient.set(SocketConstants_1.SOCKET_ID_KEY + socketId, user._id, (err, rep) => {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    });
}
exports.SetUserIdBySocketId = SetUserIdBySocketId;
function SetSocketIdByUserId(socketId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let socketIds = yield GetSocketIdsByUserId(userId);
        if (socketIds && socketIds.length) {
            socketIds.push(socketId);
        }
        else {
            socketIds = [socketId];
        }
        return new Promise((resolve, reject) => {
            redisClient.set(SocketConstants_1.USER_ID_KEY + userId, JSON.stringify(socketIds), (err, rep) => {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    });
}
exports.SetSocketIdByUserId = SetSocketIdByUserId;
function SetSocketIdsByUserId(socketIds, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            redisClient.set(SocketConstants_1.USER_ID_KEY + userId, JSON.stringify(socketIds), (err, rep) => {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    });
}
exports.SetSocketIdsByUserId = SetSocketIdsByUserId;
function GetUserIdBySocketId(socketId) {
    return new Promise((resolve, reject) => {
        redisClient.get(SocketConstants_1.SOCKET_ID_KEY + socketId, (err, rep) => {
            if (err)
                reject(err);
            resolve(rep);
        });
    });
}
exports.GetUserIdBySocketId = GetUserIdBySocketId;
function GetSocketIdsByUserId(userId) {
    return new Promise((resolve, reject) => {
        redisClient.get(SocketConstants_1.USER_ID_KEY + userId, (err, rep) => {
            if (err)
                reject(err);
            resolve(JSON.parse(rep));
        });
    });
}
exports.GetSocketIdsByUserId = GetSocketIdsByUserId;
function RemoveSocketId(socketId) {
    return new Promise((resolve, reject) => {
        redisClient.del(SocketConstants_1.SOCKET_ID_KEY + socketId, (err, rep) => {
            if (err)
                reject(err);
            resolve(true);
        });
    });
}
exports.RemoveSocketId = RemoveSocketId;
function RemoveSocketIdFromUserSockets(socketId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let socketIds = yield GetSocketIdsByUserId(userId);
        if (socketIds && socketIds.length) {
            socketIds = socketIds.filter((id) => id !== socketId);
            yield SetSocketIdsByUserId(socketIds, userId);
        }
    });
}
exports.RemoveSocketIdFromUserSockets = RemoveSocketIdFromUserSockets;
function SocketAuthentication(socket, next) {
    const bearerToken = socket.handshake.query.authorization;
    console.log(bearerToken, "SOCKET BEARER");
    if (!bearerToken) {
        return next(new exception_1.UnAuthorizedException());
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
exports.SocketAuthentication = SocketAuthentication;
//# sourceMappingURL=SocketAutentication.js.map