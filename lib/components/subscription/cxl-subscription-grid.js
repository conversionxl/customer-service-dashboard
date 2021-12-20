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
import { SubscriptionCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";
let CXLSubscriptionGridElement = class CXLSubscriptionGridElement extends GridElement {
    constructor() {
        super(...arguments);
        this._collectionType = SubscriptionCollection;
    }
    render() {
        return html`
            <vaadin-grid .items=${this.items}>
                <vaadin-grid-column
                    header="#"
                    path="id"
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Product Name"
                    path="productName"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Start Date"
                    path="startDate"
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="End Date"
                    path="endDate"
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Total"
                    path="totalFormatted"
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Status"
                    path="status"
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    .renderer=${this._boundActionColumnRenderer}
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
};
CXLSubscriptionGridElement = __decorate(
    [customElement("cxl-subscription-grid")],
    CXLSubscriptionGridElement
);
export { CXLSubscriptionGridElement };
