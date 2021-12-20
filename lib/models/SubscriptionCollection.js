import { BaseCollectionModel } from "../models";
import { Subscription } from "./Subscription";
export class SubscriptionCollection extends BaseCollectionModel {
    constructor() {
        super(...arguments);
        this._itemType = Subscription;
        this._version = "wc/v1";
    }
    get _endpoint() {
        return `subscriptions`;
    }
}
