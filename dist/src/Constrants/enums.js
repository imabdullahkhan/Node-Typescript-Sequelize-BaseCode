"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["Active"] = 1] = "Active";
    UserStatus[UserStatus["Inactive"] = 2] = "Inactive";
    UserStatus[UserStatus["Unverified"] = 3] = "Unverified";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserType;
(function (UserType) {
    UserType[UserType["Child"] = 1] = "Child";
    UserType[UserType["Parent"] = 2] = "Parent";
})(UserType = exports.UserType || (exports.UserType = {}));
//# sourceMappingURL=enums.js.map