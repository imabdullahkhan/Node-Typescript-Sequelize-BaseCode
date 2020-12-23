"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubscriptionCustomer = exports.AddSubscriptionCustomer = exports.UpdateStripeCustomerCard = exports.AddCustomerToStripe = exports.AddSubscriptionOnStripe = exports.DeleteSubscriptionFromStripe = void 0;
const stripe_1 = require("../Configs/stripe");
const routing_controllers_1 = require("routing-controllers");
function DeleteSubscriptionFromStripe(SubscriptionId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const plan = yield stripe_1.StripeClient.GetInstance().plans.del(SubscriptionId);
            return resolve(true);
        }
        catch (e) {
            throw new routing_controllers_1.NotFoundError("No Plan found on stripe dashboard or something went wrong.");
        }
    }));
}
exports.DeleteSubscriptionFromStripe = DeleteSubscriptionFromStripe;
//to handle currency and interval in enums (kuch acha sochna h is per)
function AddSubscriptionOnStripe(amount, interval, name, currency) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const Stripe = stripe_1.StripeClient.GetInstance();
            const amountInCents = Number((amount * 100).toFixed(2));
            const plan = yield Stripe.plans.create({
                amount_decimal: amountInCents,
                currency: currency,
                interval: interval,
                nickname: name,
                product: {
                    name: name
                },
            });
            return resolve(plan.id);
        }
        catch (e) {
            throw new routing_controllers_1.BadRequestError("Please Verify Input");
        }
    }));
}
exports.AddSubscriptionOnStripe = AddSubscriptionOnStripe;
function AddCustomerToStripe(email, source) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const stripe = stripe_1.StripeClient.GetInstance();
            const stripeCustomer = yield stripe.customers.create({ email, source });
            return resolve(stripeCustomer);
        }
        catch (e) {
            throw e;
        }
    }));
}
exports.AddCustomerToStripe = AddCustomerToStripe;
function UpdateStripeCustomerCard(stripeCustomerId, source) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const stripe = stripe_1.StripeClient.GetInstance();
            const stripeCustomer = yield stripe.customers.update(stripeCustomerId, { source });
            return resolve(stripeCustomer);
        }
        catch (e) {
            throw e;
        }
    }));
}
exports.UpdateStripeCustomerCard = UpdateStripeCustomerCard;
function AddSubscriptionCustomer(stripeCustomer, stripePlanId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const Stripe = yield stripe_1.StripeClient.GetInstance();
            const stripeSubscription = yield Stripe.subscriptions.create({
                customer: stripeCustomer,
                items: [{
                        plan: stripePlanId
                    }]
            });
            resolve(stripeSubscription);
        }
        catch (e) {
            reject(e);
        }
    }));
}
exports.AddSubscriptionCustomer = AddSubscriptionCustomer;
function UpdateSubscriptionCustomer(stripeSubscriptionId, stripePlanId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const Stripe = yield stripe_1.StripeClient.GetInstance();
            const stripeSubscription = yield Stripe.subscriptions.update(stripeSubscriptionId, {
                plan: stripePlanId,
                prorate: true
            });
            resolve(stripeSubscription);
        }
        catch (e) {
            reject(e);
        }
    }));
}
exports.UpdateSubscriptionCustomer = UpdateSubscriptionCustomer;
//# sourceMappingURL=SubscriptionHelper.js.map