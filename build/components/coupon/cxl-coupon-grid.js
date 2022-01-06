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
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-form-layout";
import { customElement, html } from "lit-element";
import { CouponCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";
import "./cxl-coupon-view";
let CXLCouponGridElement = class CXLCouponGridElement extends GridElement {
    constructor() {
        super(...arguments);
        this._collectionType = CouponCollection;
    }
    render() {
        return html`
            <vaadin-grid>
                <vaadin-grid-sort-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-sort-column>
                <vaadin-grid-filter-column
                    header="Code"
                    resizable
                    path="code"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    header="Amount"
                    resizable
                    path="amount"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    header="Date Created"
                    resizable
                    path="date_created"
                ></vaadin-grid-filter-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
};
CXLCouponGridElement = __decorate(
    [customElement("cxl-coupon-grid")],
    CXLCouponGridElement
);
export { CXLCouponGridElement };
