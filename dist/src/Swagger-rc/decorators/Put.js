"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = void 0;
const routing_controllers_1 = require("routing-controllers");
const BaseRoutingController_1 = require("../BaseRoutingController");
function Put(route, options) {
    return function (object, methodName) {
        routing_controllers_1.Put(route)(object, methodName);
        BaseRoutingController_1.BaseRoutingControllerExt.InitUriDocumentation(options)(object, methodName);
    };
}
exports.Put = Put;
//# sourceMappingURL=Put.js.map