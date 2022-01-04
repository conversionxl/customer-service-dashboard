var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === "object" &&
            typeof Reflect.decorate === "function"
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
import { css, customElement, html, property } from "lit-element";
import { Coupon } from "../../models";
import { ViewElement } from "../../base-elements/ViewElement";
let CXLCouponDetailsElement = class CXLCouponDetailsElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._itemType = Coupon;
    }
    static get styles() {
        return [
            super.styles,
            css`
                label::after {
                    content: ":";
                }

                #grid {
                    display: grid;
                    grid-template-columns: max-content auto max-content auto;
                }

                #grid > * {
                    padding: 0.5rem;
                }
            `,
        ];
    }
    render() {
        return html`
            <div id="grid">
                <label>ID</label>
                <div>${this.item.id}</div>
                <label>Code</label>
                <div>${this.item.code}</div>
                <label>Amount</label>
                <div>${this.item.amount}</div>
            </div>
        `;
    }
    async getItem() {
        this.item = await new Coupon(this.item).get();
    }
};
__decorate(
    [property({ type: Object })],
    CXLCouponDetailsElement.prototype,
    "item",
    void 0
);
CXLCouponDetailsElement = __decorate(
    [customElement("cxl-coupon-details")],
    CXLCouponDetailsElement
);
export { CXLCouponDetailsElement };
