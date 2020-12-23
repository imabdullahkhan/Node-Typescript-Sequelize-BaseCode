"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const routing_controllers_1 = require("routing-controllers");
const Exception = __importStar(require("../exception/index"));
const index_1 = require("../exception/index");
let ErrorHandlerMiddleware = class ErrorHandlerMiddleware {
    error(err, request, res, next) {
        console.log(err);
        if (err instanceof routing_controllers_1.BadRequestError) {
            res.status(402).json({
                data: null,
                message: this._prepareBadRequestErrors(err),
                status: err.httpCode,
                success: false
            });
        }
        else if (err instanceof index_1.ResponseException) {
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        }
        else if (err instanceof index_1.CustomException) {
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        }
        else if (err instanceof index_1.NotFoundException) {
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        }
        else if (err instanceof index_1.BadRequestException) {
            res.status(200).json({
                data: null,
                description: err.Description || null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        }
        else if (!(err instanceof index_1.ResponseException)) {
            err = new Exception.FatalErrorException(Exception.ResponseOrigin.INTERNALSERVER, Exception.ResponseMessage.FATALERROR);
            res.status(200).json({
                data: null,
                message: err.Message,
                status: err.Status,
                success: false
            });
        }
    }
    _prepareBadRequestErrors(error) {
        let errors = {};
        // console.log(error.constraints);
        let func = function (err) {
            if (err.property && err.constraints) {
                let constraints = [];
                for (let constraint in err.constraints) {
                    if (constraint === "customValidation") {
                        errors[err.property] = [err.constraints[constraint]];
                    }
                    else {
                        constraints.push(err.constraints[`${constraint}`]);
                    }
                }
                if (constraints.length > 0) {
                    errors[err.property] = constraints;
                }
            }
            else if (Array.isArray(err.children) && err.children.length > 0) {
                for (let child of err.children) {
                    func(child);
                }
            }
        };
        if (error && error.errors && Array.isArray(error.errors)) {
            for (let err of error.errors) {
                func(err);
            }
        }
        return errors;
    }
};
ErrorHandlerMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: "after" })
], ErrorHandlerMiddleware);
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
//# sourceMappingURL=ErrorHandler.js.map