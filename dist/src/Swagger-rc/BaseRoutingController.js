"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoutingControllerExt = void 0;
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const ResponseSchema_1 = require("./ResponseSchema");
const exception_1 = require("../exception");
const index_1 = require("../Response/index");
class BaseRoutingControllerExt {
    /**
     * Overwrite Generic response list by response object(provided from controller)
     * @param responseObject
     */
    static GetGenericResponseList(responseObject) {
        //TODO:It will be created by enum
        let genericResponseList = [
            {
                code: exception_1.ResponseCode.NOT_FOUND,
                description: exception_1.ResponseMessage.NOTFOUND,
                model: { Message: index_1.MessageResponse }
            },
            {
                code: exception_1.ResponseCode.BAD_REQUEST,
                description: exception_1.ResponseMessage.BAD_REQUEST,
                model: { Message: index_1.MessageResponse }
            },
            {
                code: exception_1.ResponseCode.UNAUTHORIZED,
                description: exception_1.ResponseMessage.UNAUTHORIZED,
                model: { Message: index_1.MessageResponse }
            },
            {
                code: exception_1.ResponseCode.FORBIDDEN,
                description: exception_1.ResponseMessage.FORBIDDEN,
                model: { Message: index_1.MessageResponse }
            },
            {
                code: exception_1.ResponseCode.SERVER_ERROR,
                description: exception_1.ResponseMessage.SERVER_ERROR,
                model: { Message: index_1.MessageResponse }
            }
        ];
        if (!responseObject) {
            return genericResponseList;
        }
        //Get status code from custom response object
        //[401,400]
        let responseStatusList = Object.keys(responseObject);
        //Remove response from generic responses list if exits in custom response object
        for (let status of responseStatusList) {
            //Return undefined if it not found
            let index = genericResponseList.findIndex(element => {
                return element.code.toString() == status;
            });
            //If exits
            if (index > -1) {
                genericResponseList.splice(index, 1);
            }
        }
        return genericResponseList;
    }
    static InitUriDocumentation(options = {}) {
        return function (object, methodName) {
            const GENERIC_RESPONSES = BaseRoutingControllerExt.GetGenericResponseList(options.responsesObject);
            //check successResponseOption(200 status code) and invoke function
            if (options && options.successResponseOptions) {
                ResponseSchema_1.ResponseSchema(options.successResponseOptions)(object, methodName);
            }
            //Invoke openApi decorator factory for response
            if (options && options.responsesObject) {
                routing_controllers_openapi_1.OpenAPI({
                    responses: options.responsesObject
                })(object, methodName);
            }
            //Generic Response Messages
            for (let response of GENERIC_RESPONSES) {
                ResponseSchema_1.ResponseSchema(response)(object, methodName);
            }
            //End of Generic Response Messages
        };
    }
}
exports.BaseRoutingControllerExt = BaseRoutingControllerExt;
//# sourceMappingURL=BaseRoutingController.js.map