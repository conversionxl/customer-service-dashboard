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
import "@vaadin/vaadin-text-field/vaadin-number-field";
import "@vaadin/vaadin-text-field/vaadin-text-area";
import { css, customElement, html, queryAll } from "lit-element";
import { Order, Refund } from "../../models";
import { notification } from "../../utilities";
import { ViewElement } from "../../base-elements/ViewElement";
let CXLRefundCreateElement = class CXLRefundCreateElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._itemType = Order;
    }
    static get styles() {
        return [
            super.styles,
            css`
                hr {
                    width: 100%;
                }

                label {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                vaadin-form-item {
                    --vaadin-form-item-label-spacing: 0;
                    --vaadin-form-item-label-width: 0;
                    --vaadin-form-item-row-spacing: 1rem;
                }

                vaadin-number-field[label="Refund Total"] {
                    grid-column: 3;
                }

                #action {
                    grid-template-columns: repeat(2, 1fr);
                }

                #lineItems {
                    grid-template-columns: auto repeat(2, max-content);
                }

                .grid {
                    display: grid;
                }

                .grid.gap {
                    grid-gap: 1rem;
                }
            `,
        ];
    }
    render() {
        var _a, _b, _c, _d;
        return html`
            <div class="grid gap">
                <vaadin-form-item>
                    <vaadin-number-field
                        disabled
                        label="Order ID:"
                        value=${(_a = this.item) === null || _a === void 0
                            ? void 0
                            : _a.orderId}
                        required
                    ></vaadin-number-field>
                </vaadin-form-item>
                <div id="lineItems" class="full-width grid gap">
                    ${(_c =
                        (_b = this.item) === null || _b === void 0
                            ? void 0
                            : _b.order) === null || _c === void 0
                        ? void 0
                        : _c.lineItems.map(
                              (item, index) => html`
                                  <vaadin-text-field
                                      disabled
                                      label="Product Name"
                                      value=${item.name}
                                  ></vaadin-text-field>
                                  <vaadin-number-field
                                      label="Total"
                                      value=${item.total}
                                      required
                                  >
                                      <div slot="prefix">$</div>
                                  </vaadin-number-field>
                                  <vaadin-number-field
                                      @input=${this._update}
                                      data-index=${index}
                                      label="Refund Amount"
                                      value="0"
                                      required
                                  >
                                      <div slot="prefix">$</div>
                                  </vaadin-number-field>
                              `
                          )}
                    <vaadin-number-field
                        label="Refund Total"
                        value=${(_d = this.item) === null || _d === void 0
                            ? void 0
                            : _d.amount}
                        required
                    >
                        <div slot="prefix">$</div>
                    </vaadin-number-field>
                </div>
                <vaadin-text-area
                    @input=${this._setText}
                    class="full-width"
                    label="Reason"
                    name="reason"
                ></vaadin-text-area>
                <hr />
                <div id="action" class="grid gap">
                    <vaadin-button @click=${this._back}>Cancel</vaadin-button>
                    <vaadin-button @click=${this._save}>Save</vaadin-button>
                </div>
            </div>
        `;
    }
    // Get item needs to be based on orderId, not id.
    async updated(changedProperties) {
        var _a, _b;
        super.updated(changedProperties);
        if (
            changedProperties.has("item") &&
            (changedProperties.get("item") || {}).orderId !==
                ((_a = this.item) === null || _a === void 0
                    ? void 0
                    : _a.orderId)
        ) {
            if (
                !this._getDisabled &&
                !((_b = this.item) === null || _b === void 0
                    ? void 0
                    : _b._getCompleted)
            ) {
                this.item = await this.getItem();
            }
            this.pending = false;
        }
    }
    async getItem() {
        const item = new Refund({ orderId: this.item.orderId });
        // No need to get the item.
        item._getCompleted = true;
        await item.getOrder();
        this.pending = false;
        return item;
    }
    async _save() {
        try {
            const response = await this.item.save();
            notification(
                {
                    message: html`<span style="flex: 1; text-align: center;"
                        >${this._itemName} created!</span
                    >`,
                    theme: "success",
                },
                this.shadowRoot
            );
            Router.go(`refund/view/${this.item.orderId}/${response.data.id}`);
        } catch (error) {
            notification(
                { message: error.response.data.message, theme: "error" },
                this.shadowRoot
            );
        }
    }
    _setText(e) {
        const target = e.target;
        this.item[target.name] = target.value;
    }
    _update(event) {
        var _a, _b, _c, _d, _e, _f;
        console.log("item", this.item);
        console.log("event", event);
        console.log(
            (_b =
                (_a = this.item) === null || _a === void 0
                    ? void 0
                    : _a.order) === null || _b === void 0
                ? void 0
                : _b.lineItems
        );
        const lineItems = [
            ...((_d =
                (_c = this.item) === null || _c === void 0
                    ? void 0
                    : _c.order) === null || _d === void 0
                ? void 0
                : _d.lineItems),
        ];
        if (!lineItems[event.target.dataset.index]) {
            lineItems[event.target.dataset.index] = {
                id:
                    (_f =
                        (_e = this.item) === null || _e === void 0
                            ? void 0
                            : _e.order) === null || _f === void 0
                        ? void 0
                        : _f.lineItems[event.target.dataset.index].id,
            };
        }
        lineItems[event.target.dataset.index].refund_total = event.target.value;
        console.log("Line items", lineItems);
        this.item.line_items = lineItems;
        this.requestUpdate("item");
    }
};
__decorate(
    [queryAll('vaadin-number-field[label="Refund Amount"]')],
    CXLRefundCreateElement.prototype,
    "amountFields",
    void 0
);
CXLRefundCreateElement = __decorate(
    [customElement("cxl-refund-create")],
    CXLRefundCreateElement
);
export { CXLRefundCreateElement };
