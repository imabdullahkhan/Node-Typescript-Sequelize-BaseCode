"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetOpenAPISSMetaData = exports.GetOpenAPISSMetaData = void 0;
const OPEN_API_KEY = Symbol("routing-controllers-openapi:OpenAPI");
const SS_API_KEY = Symbol("ss-api:OpenAPI");
function GetOpenAPISSMetaData(target, key) {
    return Reflect.getMetadata(SS_API_KEY, target.constructor, key) || [];
}
exports.GetOpenAPISSMetaData = GetOpenAPISSMetaData;
function SetOpenAPISSMetaData(data, target, key) {
    Reflect.defineMetadata(SS_API_KEY, data, target.constructor, key);
}
exports.SetOpenAPISSMetaData = SetOpenAPISSMetaData;
//# sourceMappingURL=OpenAPIHelper.js.map