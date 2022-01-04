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
import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import "@vaadin/vaadin-split-layout";
import { css, customElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { cache } from "lit-html/directives/cache.js";
import { Coupon } from "../../models";
import { ViewElement } from "../../base-elements/ViewElement";
import "../membership/cxl-membership-grid";
import "../order/cxl-order-grid";
import "../subscription/cxl-subscription-grid";
let CXLCouponViewElement = class CXLCouponViewElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._tabIndex = 0;
        this._itemType = Coupon;
        this.pending = false;
    }
    static get styles() {
        return [
            super.styles,
            css`
                vaadin-split-layout {
                    height: 100%;
                }

                #tabs {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                #tabContent {
                    height: 100%;
                    overflow: hidden;
                }
            `,
        ];
    }
    render() {
        if (!(this.item instanceof this._itemType))
            return html`<span id="loading">Loading...</span>`;
        return html`
            <vaadin-split-layout orientation="vertical">
                <cxl-coupon-details .item=${this.item}></cxl-coupon-details>
                <div id="tabs">
                    <vaadin-tabs @selected-changed="${this._selectedChanged}">
                        <vaadin-tab></vaadin-tab>
                        <vaadin-tab></vaadin-tab>
                        <vaadin-tab></vaadin-tab>
                    </vaadin-tabs>
                    <div id="tabContent">
                        ${cache(this._tabIndex === 0 ? html`` : nothing)}
                        ${cache(this._tabIndex === 1 ? html`` : nothing)}
                        ${cache(this._tabIndex === 2 ? html`` : nothing)}
                    </div>
                </div>
            </vaadin-split-layout>
        `;
    }
    async getItem() {
        this.item = await new Coupon(this.item).get();
    }
    _selectedChanged(e) {
        this._tabIndex = e.detail.value;
    }
};
__decorate(
    [property({ type: Number })],
    CXLCouponViewElement.prototype,
    "_tabIndex",
    void 0
);
CXLCouponViewElement = __decorate(
    [customElement("cxl-coupon-view")],
    CXLCouponViewElement
);
export { CXLCouponViewElement };
