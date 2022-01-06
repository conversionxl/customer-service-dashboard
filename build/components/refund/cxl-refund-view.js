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
import "@vaadin/vaadin-text-field";
import { css, customElement, html } from "lit-element";
import { Refund } from "../../models";
import { ViewElement } from "../../base-elements/ViewElement";
let CXLRefundViewElement = class CXLRefundViewElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._itemType = Refund;
    }
    static get styles() {
        return [
            super.styles,
            css`
                label::after {
                    content: ":";
                }

                #grid {
                    display: grid;
                    grid-template-columns: repeat(4, max-content);
                }

                #grid > * {
                    padding: 0.5rem;
                }

                .capitalize {
                    text-transform: capitalize;
                }
            `,
        ];
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return html`
            <div class="grid">
                <vaadin-text-field
                    disabled
                    label="ID"
                    value=${(_a = this.item) === null || _a === void 0
                        ? void 0
                        : _a.id}
                ></vaadin-text-field>
                <vaadin-text-field
                    disabled
                    label="Date Created"
                    value=${(_b = this.item) === null || _b === void 0
                        ? void 0
                        : _b.dateCreated}
                ></vaadin-text-field>
                <vaadin-text-field
                    disabled
                    label="Amount"
                    value=${(_c = this.item) === null || _c === void 0
                        ? void 0
                        : _c.amount}
                ></vaadin-text-field>
                <vaadin-text-area
                    disabled
                    label="Reason"
                    value=${(_d = this.item) === null || _d === void 0
                        ? void 0
                        : _d.reason}
                ></vaadin-text-area>
                <ul>
                    <li>
                        Customer:
                        <a
                            href="/customers/${(_f =
                                (_e = this.item) === null || _e === void 0
                                    ? void 0
                                    : _e.customer) === null || _f === void 0
                                ? void 0
                                : _f.id}"
                            >${(_h =
                                (_g = this.item) === null || _g === void 0
                                    ? void 0
                                    : _g.customer) === null || _h === void 0
                                ? void 0
                                : _h.name}</a
                        >
                    </li>
                    <li>
                        Order #:
                        <a
                            href="/orders/${(_k =
                                (_j = this.item) === null || _j === void 0
                                    ? void 0
                                    : _j.order) === null || _k === void 0
                                ? void 0
                                : _k.id}"
                            >${(_m =
                                (_l = this.item) === null || _l === void 0
                                    ? void 0
                                    : _l.order) === null || _m === void 0
                                ? void 0
                                : _m.number}</a
                        >
                    </li>
                </ul>
            </div>
        `;
    }
    async getItem() {
        const item = await super.getItem();
        // needs to be synchroneous because we get customer id from the order
        await item.getOrder();
        await item.getCustomer();
        return item;
    }
};
CXLRefundViewElement = __decorate(
    [customElement("cxl-refund-view")],
    CXLRefundViewElement
);
export { CXLRefundViewElement };
