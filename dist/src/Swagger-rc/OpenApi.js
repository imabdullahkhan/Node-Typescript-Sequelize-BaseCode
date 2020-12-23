"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPI = void 0;
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
function OpenAPI(spec) {
    return function (target, key) {
        routing_controllers_openapi_1.OpenAPI([spec])(target, key);
    };
}
exports.OpenAPI = OpenAPI;
//# sourceMappingURL=OpenApi.js.map