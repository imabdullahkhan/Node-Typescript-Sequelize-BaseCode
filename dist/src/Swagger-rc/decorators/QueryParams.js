"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParams = void 0;
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const OpenAPIHelper_1 = require("../../Helpers/OpenAPIHelper");
function QueryParams() {
    return function (object, methodName, parameterIndex) {
        routing_controllers_1.QueryParams()(object, methodName, parameterIndex);
        const paramTypes = Reflect.getMetadata("design:paramtypes", object, methodName);
        const targetType = paramTypes[parameterIndex];
        const metadatas = class_validator_jsonschema_1.validationMetadatasToSchemas(class_validator_1.getFromContainer(class_validator_1.MetadataStorage).validationMetadatas, {});
        if (metadatas[targetType.name]) {
            let metaData = metadatas[targetType.name];
            let parametersSchema = OpenAPIHelper_1.GetOpenAPISSMetaData(object, methodName);
            for (const key in metaData.properties) {
                let data = metaData.properties[key];
                parametersSchema.push({
                    in: "query",
                    name: key,
                    schema: {
                        type: data.enum ? "number" : data.type ? data.type : "string",
                        $ref: "",
                        items: data.items
                    },
                    required: false,
                    description: data.oneOf ? " YYYY-MM-DD" : ``
                });
            }
            OpenAPIHelper_1.SetOpenAPISSMetaData(parametersSchema, object, methodName);
            routing_controllers_openapi_1.OpenAPI({
                parameters: parametersSchema
            })(object, methodName);
        }
    };
}
exports.QueryParams = QueryParams;
//# sourceMappingURL=QueryParams.js.map