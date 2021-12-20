import { BaseCollectionModel } from "../models";
import { Coupon } from "./Coupon";
export class CouponCollection extends BaseCollectionModel {
    constructor() {
        super(...arguments);
        this._itemType = Coupon;
    }
    get _endpoint() {
        return `coupons`;
    }
}
