import { BaseCollectionModel } from "../models";
import { Refund } from "./Refund";
export class RefundCollection extends BaseCollectionModel {
    constructor() {
        super(...arguments);
        this._itemType = Refund;
    }
    get _endpoint() {
        return `orders/${this.orderId}/refunds`;
    }
}
