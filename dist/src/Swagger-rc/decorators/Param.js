"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const OpenAPIHelper_1 = require("../../Helpers/OpenAPIHelper");
function Param(key) {
    return function (object, methodName, parameterIndex) {
        routing_controllers_1.Param(key)(object, methodName, parameterIndex);
        let parametersSchema = OpenAPIHelper_1.GetOpenAPISSMetaData(object, methodName);
        parametersSchema.unshift({
            in: "path",
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
exports.Param = Param;
//# sourceMappingURL=Param.js.map