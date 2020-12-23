"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSchema = void 0;
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
function ResponseSchema(options) {
    return function (object, methodName) {
        routing_controllers_openapi_1.ResponseSchema(options.model, {
            description: options.description,
            isArray: options.isArray,
            statusCode: options.code || "200",
            contentType: "application/json"
        })(object, methodName);
    };
}
exports.ResponseSchema = ResponseSchema;
//# sourceMappingURL=ResponseSchema.js.map