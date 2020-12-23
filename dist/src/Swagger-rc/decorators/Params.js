"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const OpenAPIHelper_1 = require("../../Helpers/OpenAPIHelper");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
function Params() {
    return function (object, methodName, parameterIndex) {
        routing_controllers_1.Params()(object, methodName, parameterIndex);
        const paramTypes = Reflect.getMetadata("design:paramtypes", object, methodName);
        const targetType = paramTypes[parameterIndex];
        const metadatas = class_validator_jsonschema_1.validationMetadatasToSchemas(class_validator_1.getFromContainer(class_validator_1.MetadataStorage).validationMetadatas, {});
        if (metadatas[targetType.name]) {
            let metaData = metadatas[targetType.name];
            let parametersSchema = OpenAPIHelper_1.GetOpenAPISSMetaData(object, methodName);
            for (const key in metaData.properties) {
                let data = metaData.properties[key];
                parametersSchema.unshift({
                    in: "path",
                    name: key,
                    schema: {
                        type: data.type ? data.type : "string",
                        $ref: "",
                        items: data.items
                    },
                    required: true
                });
            }
            OpenAPIHelper_1.SetOpenAPISSMetaData(parametersSchema, object, methodName);
            routing_controllers_openapi_1.OpenAPI({
                parameters: parametersSchema
            })(object, methodName);
        }
    };
}
exports.Params = Params;
//# sourceMappingURL=Params.js.map