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
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-text-field/vaadin-email-field";
import { css, customElement, html, property, query } from "lit-element";
import { nothing, render } from "lit-html";
// import objectPath from "object-path";
import { Customer } from "../../models";
import { notify } from "../../utilities";
import { ViewElement } from "../../base-elements/ViewElement";
let CXLCustomerDetailsElement = class CXLCustomerDetailsElement extends ViewElement {
    constructor() {
        super(...arguments);
        this.editable = false;
        this._itemType = Customer;
        this._updates = {};
    }
    static get styles() {
        return [
            ...super.styles,
            css`
                label::after {
                    content: ":";
                }
            `,
        ];
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return html`
            <form>
                <div class="grid gap">
                    <vaadin-checkbox
                        disabled
                        checked=${(_a = this.item) === null || _a === void 0
                            ? void 0
                            : _a.isPayingCustomer}
                        >Paying customer</vaadin-checkbox
                    >
                </div>
                <hr />
                <div class="column-gap columns grid">
                    <vaadin-text-field
                        @change=${this._updateField}
                        disabled
                        label="First name"
                        name="firstName"
                        value=${(_b = this.item) === null || _b === void 0
                            ? void 0
                            : _b.firstName}
                    >
                    </vaadin-text-field>
                    <vaadin-text-field
                        @change=${this._updateField}
                        disabled
                        label="Last name"
                        name="lastName"
                        value=${(_c = this.item) === null || _c === void 0
                            ? void 0
                            : _c.lastName}
                    >
                    </vaadin-text-field>
                    <vaadin-email-field
                        @change=${this._updateField}
                        disabled
                        label="Email"
                        name="email"
                        value=${(_d = this.item) === null || _d === void 0
                            ? void 0
                            : _d.email}
                    >
                    </vaadin-email-field>
                </div>
                <hr />
                <div class="column-gap columns grid">
                    <vaadin-text-field
                        @change=${this._updateField}
                        disabled
                        label="Address"
                        name="billing.address"
                        value=${(_f =
                            (_e = this.item) === null || _e === void 0
                                ? void 0
                                : _e.billing) === null || _f === void 0
                            ? void 0
                            : _f.address}
                    >
                    </vaadin-text-field>
                    <vaadin-text-field
                        @change=${this._updateField}
                        disabled
                        label="City"
                        name="billing.city"
                        value=${(_h =
                            (_g = this.item) === null || _g === void 0
                                ? void 0
                                : _g.billing) === null || _h === void 0
                            ? void 0
                            : _h.city}
                    >
                    </vaadin-text-field>
                    <vaadin-text-field
                        @change=${this._updateField}
                        disabled
                        label="Country"
                        name="billing.country"
                        value=${(_k =
                            (_j = this.item) === null || _j === void 0
                                ? void 0
                                : _j.billing) === null || _k === void 0
                            ? void 0
                            : _k.country}
                    >
                    </vaadin-text-field>
                    <vaadin-text-field
                        @change=${this._updateField}
                        disabled
                        label="Phone"
                        name="billing.phone"
                        value=${(_m =
                            (_l = this.item) === null || _l === void 0
                                ? void 0
                                : _l.billing) === null || _m === void 0
                            ? void 0
                            : _m.phone}
                    >
                    </vaadin-text-field>
                </div>
                <hr />
                <div class="column-gap columns grid">
                    <vaadin-text-field
                        disabled
                        label="Customer since"
                        value=${(_o = this.item) === null || _o === void 0
                            ? void 0
                            : _o.customerSince}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Subscriber since"
                        value=${(_p = this.item) === null || _p === void 0
                            ? void 0
                            : _p.subscriberSince}
                    ></vaadin-text-field>
                    <!-- <vaadin-text-field
                        disabled
                        label="Team"
                        value=${(_q = this.item) === null || _q === void 0
                        ? void 0
                        : _q.team}
                    ></vaadin-text-field> -->
                    <vaadin-text-field
                        disabled
                        label="Subscription"
                        value=${(_r = this.item) === null || _r === void 0
                            ? void 0
                            : _r.productName}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Currency"
                        value=${(_s = this.item) === null || _s === void 0
                            ? void 0
                            : _s.currency}
                    ></vaadin-text-field>
                </div>
                ${this.editable
                    ? html`
                          <hr />
                          <div class="column-gap columns grid">
                              <vaadin-button>Reset</vaadin-button>
                              <vaadin-button @click=${this._save}
                                  >Save</vaadin-button
                              >
                          </div>
                      `
                    : nothing}
            </form>
        `;
    }
    async getItem() {
        const item = await super.getItem();
        await Promise.all([
            item.getMemberships(),
            item.getOrders(),
            item.getSubscriptions(),
        ]);
        return item;
    }
    _confirm({ callback, message }) {
        const dialog = document.createElement("vaadin-dialog");
        dialog.renderer = (root, dialog) => {
            const cancel = () => {
                dialog.opened = false;
            };
            const confirm = () => {
                dialog.opened = false;
                callback();
            };
            render(
                html`
                    <span style="display: flex; justify-content: center;"
                        >${message}</span
                    >
                    <hr />
                    <vaadin-button @click=${cancel}>Cancel</vaadin-button>
                    <vaadin-button @click=${confirm}>OK</vaadin-button>
                `,
                root
            );
        };
        this.shadowRoot.appendChild(dialog);
        dialog.opened = true;
    }
    _save() {
        const callback = async () => {
            await this.item.save.bind(this.item)();
            if (this.item._response.status === 200) {
                notify({ message: "Success!", theme: "success" });
            } else {
                notify({ message: "Error!", theme: "error" });
            }
        };
        this._confirm({ callback, message: "Are you sure?" });
    }
    _updateField(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        // objectPath.set(this.item._updates, e.target.name, e.target.value);
        console.log(this.item);
        this.item[e.target.getAttribute("name")] = e.target.value;
        console.log(this.item._updates);
    }
};
__decorate(
    [property({ type: Boolean })],
    CXLCustomerDetailsElement.prototype,
    "editable",
    void 0
);
__decorate(
    [query("form")],
    CXLCustomerDetailsElement.prototype,
    "form",
    void 0
);
CXLCustomerDetailsElement = __decorate(
    [customElement("cxl-customer-details")],
    CXLCustomerDetailsElement
);
export { CXLCustomerDetailsElement };
