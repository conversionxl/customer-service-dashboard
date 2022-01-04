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
import { CustomerCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";
import "./cxl-customer-view";
let CXLCustomerGridElement = class CXLCustomerGridElement extends GridElement {
    constructor() {
        super(...arguments);
        this._collectionType = CustomerCollection;
    }
    render() {
        return html`
            <vaadin-grid .items=${this.items}>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="First Name"
                    resizable
                    path="firstName"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="Last Name"
                    resizable
                    path="lastName"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    header="Email"
                    resizable
                    path="email"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="City"
                    resizable
                    path="billing.city"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    flex-grow="0"
                    header="Country"
                    resizable
                    path="billing.country"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="Customer Since"
                    resizable
                    path="customerSince"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    flex-grow="0"
                    header="Paying"
                    resizable
                    path="isPayingCustomerFormatted"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
};
CXLCustomerGridElement = __decorate(
    [customElement("cxl-customer-grid")],
    CXLCustomerGridElement
);
export { CXLCustomerGridElement };
