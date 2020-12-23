"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const routing_controllers_1 = require("routing-controllers");
const BaseRoutingController_1 = require("../BaseRoutingController");
function Delete(route, options) {
    return function (object, methodName) {
        routing_controllers_1.Delete(route)(object, methodName);
        BaseRoutingController_1.BaseRoutingControllerExt.InitUriDocumentation(options)(object, methodName);
    };
}
exports.Delete = Delete;
//# sourceMappingURL=Delete.js.map