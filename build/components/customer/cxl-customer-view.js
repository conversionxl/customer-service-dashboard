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
import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import "@vaadin/vaadin-icons/vaadin-iconset";
import "@vaadin/vaadin-split-layout";
import { css, customElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { cache } from "lit-html/directives/cache.js";
import { config } from "../../config";
import { Customer } from "../../models";
import { navigateExternal } from "../../utilities";
import "./cxl-customer-details";
import { ViewElement } from "../../base-elements/ViewElement";
import "../membership/cxl-membership-grid";
import "../order/cxl-order-grid";
import "../subscription/cxl-subscription-grid";
let CXLCustomerViewElement = class CXLCustomerViewElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._tabIndex = 0;
        this._itemType = Customer;
    }
    static get styles() {
        return [
            ...super.styles,
            css`
                vaadin-split-layout {
                    height: 100%;
                }

                #tabs {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                #tabContent {
                    height: 100%;
                    overflow: hidden;
                }
            `,
        ];
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        return html`
            <vaadin-split-layout orientation="vertical">
                <div class="full-height grid gap">
                    <div class="column-gap columns grid">
                        <vaadin-button
                            @click=${() =>
                                navigateExternal(
                                    `${config.wordpress.url}/wp/wp-admin/user-edit.php?user_id=${this.item.id}`
                                )}
                        >
                            Wordpress
                            <iron-icon
                                icon="vaadin:external-link"
                                slot="suffix"
                            ></iron-icon>
                        </vaadin-button>
                    </div>
                    <cxl-customer-details
                        .item=${this.item}
                        get-disabled
                    ></cxl-customer-details>
                </div>
                <div id="tabs">
                    <vaadin-tabs @selected-changed="${this._selectedChanged}">
                        <vaadin-tab>
                            Orders
                            (${(_b =
                                (_a = this.item) === null || _a === void 0
                                    ? void 0
                                    : _a.orders) === null || _b === void 0
                                ? void 0
                                : _b.total})
                        </vaadin-tab>
                        <vaadin-tab>
                            Subscriptions
                            (${(_d =
                                (_c = this.item) === null || _c === void 0
                                    ? void 0
                                    : _c.subscriptions) === null ||
                            _d === void 0
                                ? void 0
                                : _d.total})
                        </vaadin-tab>
                        <vaadin-tab>
                            Memberships
                            (${(_f =
                                (_e = this.item) === null || _e === void 0
                                    ? void 0
                                    : _e.memberships) === null || _f === void 0
                                ? void 0
                                : _f.total})
                        </vaadin-tab>
                    </vaadin-tabs>
                    <div id="tabContent">
                        ${this.item
                            ? html`
                                  ${cache(
                                      this._tabIndex === 0
                                          ? html`<cxl-order-grid
                                                .params=${{
                                                    customer: this.item.id,
                                                }}
                                            ></cxl-order-grid> `
                                          : nothing
                                  )}
                                  ${cache(
                                      this._tabIndex === 1
                                          ? html`<cxl-subscription-grid
                                                .params=${{
                                                    customer: this.item.id,
                                                }}
                                            >
                                            </cxl-subscription-grid>`
                                          : nothing
                                  )}
                                  ${cache(
                                      this._tabIndex === 2
                                          ? html`<cxl-membership-grid
                                                .params=${{
                                                    customer: this.item.id,
                                                }}
                                            >
                                            </cxl-membership-grid>`
                                          : nothing
                                  )}
                              `
                            : nothing}
                    </div>
                </div>
            </vaadin-split-layout>
        `;
    }
    _selectedChanged(e) {
        this._tabIndex = e.detail.value;
    }
    async getItem() {
        const item = await super.getItem();
        await Promise.all([
            item.getOrders(),
            item.getSubscriptions(),
            item.getMemberships(),
        ]);
        return item;
    }
};
__decorate(
    [property({ type: Number })],
    CXLCustomerViewElement.prototype,
    "_tabIndex",
    void 0
);
CXLCustomerViewElement = __decorate(
    [customElement("cxl-customer-view")],
    CXLCustomerViewElement
);
export { CXLCustomerViewElement };
