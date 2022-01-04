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
import { customElement, html, property } from "lit-element";
import { RefundCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";
let CXLRefundGridElement = class CXLRefundGridElement extends GridElement {
    constructor() {
        super(...arguments);
        this._collectionType = RefundCollection;
    }
    get _props() {
        return {
            orderId: this.orderId,
        };
    }
    render() {
        return html`
            <vaadin-grid>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Reason"
                    path="reason"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Payment Refunded"
                    path="refunded_payment"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Amount"
                    path="amountFormatted"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
    shouldUpdate(changedProperties) {
        // Make sure order ID is set otherwise the grid will not load.
        if (!this.orderId) return false;
        return super.shouldUpdate(changedProperties);
    }
};
__decorate(
    [property({ attribute: "order-id", type: Number })],
    CXLRefundGridElement.prototype,
    "orderId",
    void 0
);
CXLRefundGridElement = __decorate(
    [customElement("cxl-refund-grid")],
    CXLRefundGridElement
);
export { CXLRefundGridElement };
