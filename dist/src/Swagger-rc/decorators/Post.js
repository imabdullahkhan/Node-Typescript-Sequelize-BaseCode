"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const BaseRoutingController_1 = require("../BaseRoutingController");
const routing_controllers_1 = require("routing-controllers");
function Post(route, options) {
    return function (object, methodName) {
        routing_controllers_1.Post(route)(object, methodName);
        BaseRoutingController_1.BaseRoutingControllerExt.InitUriDocumentation(options)(object, methodName);
    };
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map