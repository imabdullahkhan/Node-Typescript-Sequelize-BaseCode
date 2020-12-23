"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
let DocumentController = class DocumentController {
    constructor() { }
    Get() {
        const storage = routing_controllers_1.getMetadataArgsStorage();
        const metadatas = class_validator_1.getFromContainer(class_validator_1.MetadataStorage).validationMetadatas;
        const schemas = class_validator_jsonschema_1.validationMetadatasToSchemas(metadatas, {
            refPointerPrefix: "#/components/schemas/"
        });
        return routing_controllers_openapi_1.routingControllersToSpec(storage, {}, {
            components: {
                schemas: schemas,
                securitySchemes: {
                    apiKeyAuth: {
                        type: "apiKey",
                        description: "Api authentication token",
                        name: "Authorization",
                        in: "header"
                    }
                }
            },
            info: { title: process.env.APP_NAME, version: process.env.APP_VERSION }
        });
    }
};
__decorate([
    routing_controllers_1.Get("/swagger.json"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], DocumentController.prototype, "Get", null);
DocumentController = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=DocumentController.js.map