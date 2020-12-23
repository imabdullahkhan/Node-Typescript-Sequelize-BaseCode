"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorized = void 0;
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
function Authorized(roleOrRoles) {
    if (roleOrRoles) {
        roleOrRoles = [roleOrRoles.toString()];
    }
    return function (clsOrObject, method) {
        routing_controllers_1.Authorized(roleOrRoles)(clsOrObject, method);
        routing_controllers_openapi_1.OpenAPI({
            security: [
                {
                    apiKeyAuth: []
                }
            ]
        })(clsOrObject, method);
    };
}
exports.Authorized = Authorized;
//# sourceMappingURL=Authorized.js.map