"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
const BaseRoutingController_1 = require("../BaseRoutingController");
const routing_controllers_1 = require("routing-controllers");
function Get(route, options) {
    return function (object, methodName) {
        routing_controllers_1.Get(route)(object, methodName);
        BaseRoutingController_1.BaseRoutingControllerExt.InitUriDocumentation(options)(object, methodName);
    };
}
exports.Get = Get;
//# sourceMappingURL=Get.js.map