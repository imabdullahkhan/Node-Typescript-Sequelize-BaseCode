import "reflect-metadata";
import express from "express";
import * as http from "http";
import { join } from "path";
import { Container } from "typedi";
import { useExpressServer, useContainer, Action } from "routing-controllers";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import swaggerui from "swagger-ui-express";
import { ErrorHandlerMiddleware } from "./Middlewares/ErrorHandler";
import UserController from "./Features/User/UserController";
import { DocumentController } from "./Swagger-rc/DocumentController";
import jwt from "jsonwebtoken";
import { UnAuthorizedException } from "./exception";
import UserModel from "./Features/User/UserModel";
import "./Database-loader/sequelize";
import UserRepository from "./Features/User/UserRepository";
import { UserType } from "./Constrants/enums";
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.use("/swagger", swaggerui.serve, swaggerui.setup(null, { swaggerUrl: "/swagger.json", explorer: true }));
app.use(cors());

useContainer(Container);
useExpressServer(app, {
    development: true,
    controllers: [
        DocumentController,
        UserController
    ],
    middlewares: [ErrorHandlerMiddleware],
    validation: {
        skipMissingProperties: false,
        whitelist: true,
        validationError: { target: true, value: true },
    },
    defaultErrorHandler: false,
    classTransformer: true,

    authorizationChecker: async (action: Action, roles: string[]): Promise<boolean> => {
        const bearer = action.request.headers[process.env.AUTHORIZATION_HEADER_KEY];
        if (bearer) {
            let userRepository = Container.get(UserRepository);
            const token = bearer.split(" ")[1];
            return jwt.verify(token, process.env.SECRET_KEY, async (err: any, decoded: any) => {
                if (err) {
                    throw new UnAuthorizedException();
                }
                try {
                    let user = await userRepository.findById(decoded.Id)
                    if (user) {
                        action.request.User = user;
                    }

                    if (user && !roles.length) {
                        return true;
                    }
                    if (roles[0] === "parent" && user.UserType === UserType.Parent) {
                        return true;
                    }
                    if (roles.length > 1 && roles[1] === "children" && UserType.Child === user.UserType) {
                        return true;
                    }
                    throw new UnAuthorizedException();
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            });
        } else {
            throw new UnAuthorizedException();
        }
    },
    currentUserChecker: async (action: Action) => {
        if (action.request.User) {
            return action.request.User;
        }
        return null;
    },
});

const server = http.createServer(app);
app.use(express.static(__dirname + '\\output'));
server.listen(process.env.PORT || 3000, () => {
    console.log(`###Server running on port ${process.env.PORT || 3000}###`);
});
