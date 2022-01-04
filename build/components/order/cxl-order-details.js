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
import { Router } from "@vaadin/router";
import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import { css, customElement, html, property } from "lit-element";
import { Order } from "../../models";
import { ViewElement } from "../../base-elements/ViewElement";
let CXLOrderDetailsElement = class CXLOrderDetailsElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._itemType = Order;
    }
    get endpoint() {
        return `orders/${this.order.id}`;
    }
    static get styles() {
        return [
            super.styles,
            css`
                label::after {
                    content: ":";
                }

                #actions {
                    display: grid;
                    grid-gap: 1rem;
                    grid-template-columns: 1fr 1fr;
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
    async getItem() {
        const item = await super.getItem();
        await item.getCustomer();
        return item;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return html`
            <div class="grid row-gap">
                <div>
                    <label>Customer: </label>
                    <a
                        href="/customers/${(_b =
                            (_a = this.item) === null || _a === void 0
                                ? void 0
                                : _a.customer) === null || _b === void 0
                            ? void 0
                            : _b.id}"
                    >
                        ${(_d =
                            (_c = this.item) === null || _c === void 0
                                ? void 0
                                : _c.customer) === null || _d === void 0
                            ? void 0
                            : _d.name}
                    </a>
                </div>
                <hr />
                <div class="columns grid column-gap">
                    <vaadin-text-field
                        disabled
                        label="Order #"
                        value=${(_e = this.item) === null || _e === void 0
                            ? void 0
                            : _e.number}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Status"
                        value=${(_f = this.item) === null || _f === void 0
                            ? void 0
                            : _f.status}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Date Created"
                        value=${(_g = this.item) === null || _g === void 0
                            ? void 0
                            : _g.dateCreated}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Date Modified"
                        value=${(_h = this.item) === null || _h === void 0
                            ? void 0
                            : _h.dateModified}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Product Name"
                        value=${(_j = this.item) === null || _j === void 0
                            ? void 0
                            : _j.productName}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Relationship"
                        value=${(_k = this.item) === null || _k === void 0
                            ? void 0
                            : _k.relationship}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Total"
                        value=${(_l = this.item) === null || _l === void 0
                            ? void 0
                            : _l.total}
                    ></vaadin-text-field>
                </div>
                <hr />
                <vaadin-button
                    @click=${this.navigate}
                    href=${`/orders/${
                        (_m = this.item) === null || _m === void 0
                            ? void 0
                            : _m.id
                    }/refunds`}
                    >Issue a refund
                </vaadin-button>
                <!-- <vaadin-button>Coupon</vaadin-button> -->
            </div>
        `;
    }
    navigate(e) {
        Router.go(e.target.getAttribute("href"));
    }
};
__decorate(
    [property({ type: Object })],
    CXLOrderDetailsElement.prototype,
    "item",
    void 0
);
CXLOrderDetailsElement = __decorate(
    [customElement("cxl-order-details")],
    CXLOrderDetailsElement
);
export { CXLOrderDetailsElement };
