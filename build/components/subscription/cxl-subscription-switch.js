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
import "@vaadin/vaadin-combo-box";
import "@vaadin/vaadin-text-field";
import { css, customElement, html, query } from "lit-element";
import { Subscription } from "../../models";
import { ViewElement } from "../../base-elements/ViewElement";
import "../product/cxl-product-grid";
let CXLSubscriptionSwitchElement = class CXLSubscriptionSwitchElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._itemType = Subscription;
    }
    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    height: 100%;
                }

                .full-height {
                    height: 100%;
                }
            `,
        ];
    }
    render() {
        var _a;
        return html`
            <div class="column flex gap full-height">
                <vaadin-text-field
                    disabled
                    label="Current Product"
                    value="${(_a = this.item) === null || _a === void 0
                        ? void 0
                        : _a.productName}"
                ></vaadin-text-field>
                <hr />
                <cxl-product-grid class="flex grow"></cxl-product-grid>
                <hr />
                <div class="columns grid gap">
                    <vaadin-button @click="${this._back}">
                        Cancel
                    </vaadin-button>
                    <vaadin-button @click="${this.updateItem}">
                        Update
                    </vaadin-button>
                </div>
            </div>
        `;
    }
    updateItem() {
        console.log(this.productGrid.selectedItem);
    }
};
__decorate(
    [query("vaadin-combo-box")],
    CXLSubscriptionSwitchElement.prototype,
    "comboBox",
    void 0
);
__decorate(
    [query("cxl-product-grid")],
    CXLSubscriptionSwitchElement.prototype,
    "productGrid",
    void 0
);
CXLSubscriptionSwitchElement = __decorate(
    [customElement("cxl-subscription-switch")],
    CXLSubscriptionSwitchElement
);
export { CXLSubscriptionSwitchElement };
