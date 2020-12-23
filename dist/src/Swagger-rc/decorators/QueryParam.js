"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParam = void 0;
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const OpenAPIHelper_1 = require("../../Helpers/OpenAPIHelper");
function QueryParam(key) {
    return function (object, methodName, parameterIndex) {
        routing_controllers_1.QueryParam(key)(object, methodName, parameterIndex);
        let parametersSchema = OpenAPIHelper_1.GetOpenAPISSMetaData(object, methodName);
        parametersSchema.unshift({
            in: "query",
            name: key,
            schema: {
                type: "string"
            }
        });
        OpenAPIHelper_1.SetOpenAPISSMetaData(parametersSchema, object, methodName);
        routing_controllers_openapi_1.OpenAPI({
            parameters: parametersSchema
        })(object, methodName);
    };
}
exports.QueryParam = QueryParam;
//# sourceMappingURL=QueryParam.js.map