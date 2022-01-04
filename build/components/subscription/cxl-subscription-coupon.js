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
import "@vaadin/vaadin-button";
import { css, customElement, html, query } from "lit-element";
import { Subscription } from "../../models";
import { navigate } from "../../utilities";
import { ViewElement } from "../../base-elements/ViewElement";
import "../coupon/cxl-coupon-grid";
let CXLSubscriptionCouponElement = class CXLSubscriptionCouponElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._itemType = Subscription;
    }
    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                }
            `,
        ];
    }
    render() {
        return html`
            <cxl-coupon-grid></cxl-coupon-grid>
            <vaadin-button @click=${this.apply}>Apply</vaadin-button>
        `;
    }
    firstUpdated() {
        super.firstUpdated();
        this.couponGrid.updateComplete.then(() => {
            this.couponGrid.grid.addEventListener(
                "active-item-changed",
                (event) => {
                    this.selectedItem = event.detail.value;
                }
            );
        });
    }
    async apply() {
        const coupon = this.selectedItem.getData();
        console.log(coupon.amount);
        // Only one coupon should be able to applied at a time.
        // Technically we should be able to omit the coupon amount here, but discount_amount isn't populated.
        await this.item.put(
            { coupon_lines: [{ code: coupon.code }] } // 0
            // { coupon_lines: [{ discount_amount: coupon.amount, code: coupon.code }] } // Correct
            // { coupon_lines: [] }
        );
        console.log(this.item._lastResponse);
        if (this.item._lastResponse.status === 200) {
            navigate(`/subscriptions/${this.item.id}`);
        }
    }
};
__decorate(
    [query("cxl-coupon-grid")],
    CXLSubscriptionCouponElement.prototype,
    "couponGrid",
    void 0
);
CXLSubscriptionCouponElement = __decorate(
    [customElement("cxl-subscription-coupon")],
    CXLSubscriptionCouponElement
);
export { CXLSubscriptionCouponElement };
