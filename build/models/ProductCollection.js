import { BaseCollectionModel } from "../models";
import { Product } from "./Product";
export class ProductCollection extends BaseCollectionModel {
    constructor() {
        super(...arguments);
        this._itemType = Product;
    }
    get _endpoint() {
        return `products`;
    }
}
