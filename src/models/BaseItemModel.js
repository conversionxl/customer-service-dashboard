import { wooCommerce } from "../WooCommerce";
import { measure } from "../utilities";
import { BaseModel } from "./BaseModel";

export class BaseItemModel extends BaseModel {
    _data = {};
    _version = 3;

    constructor(args) {
        super();
        Object.assign(this._data, args);
    }

    async get() {
        await measure({ endpoint: this._endpoint }, async () => {
            const { data } = await wooCommerce.get({
                endpoint: this._endpoint,
            });

            Object.assign(this._data, data);
        });

        this._getCompleted = true;

        return this;
    }

    getData() {
        return this._data;
    }

    mapCollection(collection) {
        return;
    }
}
