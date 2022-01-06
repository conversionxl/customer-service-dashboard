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
import { OrderCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";
let CXLOrderGridElement = class CXLOrderGridElement extends GridElement {
    constructor() {
        super(...arguments);
        this._collectionType = OrderCollection;
        this.filter = {};
    }
    render() {
        return html`
            <vaadin-grid .items=${this.items}>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="number"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Customer"
                    path="customerName"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Product Name"
                    path="productName"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Date Created"
                    path="dateCreated"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Total"
                    path="totalFormatted"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Status"
                    path="status"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
};
CXLOrderGridElement = __decorate(
    [customElement("cxl-order-grid")],
    CXLOrderGridElement
);
export { CXLOrderGridElement };
