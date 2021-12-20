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
import "@vaadin/vaadin-icons";
import { css, customElement, html } from "lit-element";
import { config } from "../../config";
import { Subscription } from "../../models";
import { navigate, navigateExternal } from "../../utilities";
import { ViewElement } from "../../base-elements/ViewElement";
let CXLSubscriptionViewElement = class CXLSubscriptionViewElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._itemType = Subscription;
    }
    static get styles() {
        return [...super.styles, css``];
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return html`
            <div class="grid gap">
                <div class="columns grid gap">
                    <vaadin-button
                        @click=${() =>
                            navigateExternal(
                                `${config.wordpress.url}/wp/wp-admin/post.php?post=${this.item.id}&action=edit`
                            )}
                    >
                        Wordpress
                        <iron-icon
                            icon="vaadin:external-link"
                            slot="suffix"
                        ></iron-icon>
                    </vaadin-button>
                    <vaadin-button
                        @click=${() =>
                            navigate(`/customers/${this.item.customerId}`)}
                    >
                        Customer
                        <iron-icon
                            icon="vaadin:external-link"
                            slot="suffix"
                        ></iron-icon>
                    </vaadin-button>
                    <!-- <vaadin-button
                        @click="${() => {
                        var _a;
                        return navigate(
                            `/subscriptions/${
                                (_a = this.item) === null || _a === void 0
                                    ? void 0
                                    : _a.id
                            }/switch`
                        );
                    }}"
                        >Upgrade/Downgrade
                    </vaadin-button>
                    <vaadin-button
                        @click=${() => {
                        var _a;
                        return navigate(
                            `/subscriptions/${
                                (_a = this.item) === null || _a === void 0
                                    ? void 0
                                    : _a.id
                            }/coupon`
                        );
                    }}
                        >Edit Coupon</vaadin-button
                    > -->
                </div>
                <hr />
                <div class="columns grid gap">
                    <vaadin-text-field
                        disabled
                        label="#"
                        value="${(_a = this.item) === null || _a === void 0
                            ? void 0
                            : _a.id}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Product Name"
                        value="${(_b = this.item) === null || _b === void 0
                            ? void 0
                            : _b.productName}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Frequency"
                        value="${(_c = this.item) === null || _c === void 0
                            ? void 0
                            : _c.frequency}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Start Date"
                        value="${(_d = this.item) === null || _d === void 0
                            ? void 0
                            : _d.startDate}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="End Date"
                        value="${(_e = this.item) === null || _e === void 0
                            ? void 0
                            : _e.endDate}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Coupon Code"
                        value="${(_h =
                            (_g =
                                (_f = this.item) === null || _f === void 0
                                    ? void 0
                                    : _f.couponLines) === null || _g === void 0
                                ? void 0
                                : _g[0]) === null || _h === void 0
                            ? void 0
                            : _h.code}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Coupon Discount"
                        value="${(_l =
                            (_k =
                                (_j = this.item) === null || _j === void 0
                                    ? void 0
                                    : _j.couponLines) === null || _k === void 0
                                ? void 0
                                : _k[0]) === null || _l === void 0
                            ? void 0
                            : _l.discount}"
                    ></vaadin-text-field>
                </div>
            </div>
        `;
    }
};
CXLSubscriptionViewElement = __decorate(
    [customElement("cxl-subscription-view")],
    CXLSubscriptionViewElement
);
export { CXLSubscriptionViewElement };
