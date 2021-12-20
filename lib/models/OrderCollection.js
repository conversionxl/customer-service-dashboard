import { BaseCollectionModel } from "../models";
import { Order } from "./Order";
export class OrderCollection extends BaseCollectionModel {
    constructor() {
        super(...arguments);
        this._itemType = Order;
    }
    get _endpoint() {
        return `orders`;
    }
}
