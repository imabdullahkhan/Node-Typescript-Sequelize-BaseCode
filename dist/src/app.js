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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const path_1 = require("path");
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const ErrorHandler_1 = require("./Middlewares/ErrorHandler");
const UserController_1 = __importDefault(require("./Features/User/UserController"));
const DocumentController_1 = require("./Swagger-rc/DocumentController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exception_1 = require("./exception");
require("./Database-loader/sequelize");
const UserRepository_1 = __importDefault(require("./Features/User/UserRepository"));
const enums_1 = require("./Constrants/enums");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.join(__dirname, "public")));
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(null, { swaggerUrl: "/swagger.json", explorer: true }));
app.use(cors_1.default());
routing_controllers_1.useContainer(typedi_1.Container);
routing_controllers_1.useExpressServer(app, {
    development: true,
    controllers: [
        DocumentController_1.DocumentController,
        UserController_1.default
    ],
    middlewares: [ErrorHandler_1.ErrorHandlerMiddleware],
    validation: {
        skipMissingProperties: false,
        whitelist: true,
        validationError: { target: true, value: true },
    },
    defaultErrorHandler: false,
    classTransformer: true,
    authorizationChecker: (action, roles) => __awaiter(void 0, void 0, void 0, function* () {
        const bearer = action.request.headers[process.env.AUTHORIZATION_HEADER_KEY];
        if (bearer) {
            let userRepository = typedi_1.Container.get(UserRepository_1.default);
            const token = bearer.split(" ")[1];
            return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    throw new exception_1.UnAuthorizedException();
                }
                try {
                    let user = yield userRepository.findById(decoded.Id);
                    if (user) {
                        action.request.User = user;
                    }
                    if (user && !roles.length) {
                        return true;
                    }
                    if (roles[0] === "parent" && user.UserType === enums_1.UserType.Parent) {
                        return true;
                    }
                    if (roles.length > 1 && roles[1] === "children" && enums_1.UserType.Child === user.UserType) {
                        return true;
                    }
                    throw new exception_1.UnAuthorizedException();
                }
                catch (e) {
                    console.log(e);
                    throw e;
                }
            }));
        }
        else {
            throw new exception_1.UnAuthorizedException();
        }
    }),
    currentUserChecker: (action) => __awaiter(void 0, void 0, void 0, function* () {
        if (action.request.User) {
            return action.request.User;
        }
        return null;
    }),
});
const server = http.createServer(app);
app.use(express_1.default.static(__dirname + '\\output'));
server.listen(process.env.PORT || 3000, () => {
    console.log(`###Server running on port ${process.env.PORT || 3000}###`);
});
//# sourceMappingURL=app.js.map