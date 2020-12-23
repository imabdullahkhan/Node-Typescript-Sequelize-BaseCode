"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeClient = void 0;
const stripe_1 = __importDefault(require("stripe"));
const secret = process.env.STRIPE_SECRETKEY;
class StripeClient {
    constructor() {
    }
    static GetInstance() {
        if (this.client == null) {
            this.client = new stripe_1.default(process.env.STRIPE_SECRETKEY);
        }
        return this.client;
    }
}
exports.StripeClient = StripeClient;
//# sourceMappingURL=stripe.js.map