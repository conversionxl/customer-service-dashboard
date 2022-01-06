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
import { css, customElement, html, property, query } from "lit-element";
import { nothing } from "lit-html";
import {
    CustomerCollection,
    MembershipCollection,
    OrderCollection,
    SubscriptionCollection,
} from "../models";
import { BaseElement } from "../base-elements/BaseElement";
let WPSearchElement = class WPSearchElement extends BaseElement {
    constructor() {
        super(...arguments);
        this.currentTab = 0;
    }
    static get styles() {
        return [
            ...super.styles,
            css`
                #primary {
                    flex: 0 auto;
                }

                #tabs {
                    display: flex;
                    flex-direction: column;
                }

                #tabContent {
                    height: 100%;
                    overflow: hidden;
                }
            `,
        ];
    }
    render() {
        return html`
            <div class="column flex full-height">
                <div id="primary" class="padding-bottom">
                    <vaadin-text-field @change=${this.search} label="Search">
                    </vaadin-text-field>
                </div>
                <hr />
                <div id="tabs" class="grow">
                    ${this._pending
                        ? html`
                              <div class="center full-height">Searching...</div>
                          `
                        : nothing}
                    ${!this._pending && !this.data
                        ? html`
                              <div class="center full-height">
                                  Please enter a search term.
                              </div>
                          `
                        : nothing}
                    ${!this._pending && this.data
                        ? html`
                              <vaadin-tabs
                                  @selected-changed=${this.selectedChanged}
                              >
                                  <vaadin-tab>
                                      Customers (${this.data.customers.length})
                                  </vaadin-tab>
                                  <vaadin-tab>
                                      Orders (${this.data.orders.length})
                                  </vaadin-tab>
                                  <vaadin-tab>
                                      Subscriptions
                                      (${this.data.subscriptions.length})
                                  </vaadin-tab>
                                  <vaadin-tab>
                                      Memberships
                                      (${this.data.memberships.length})
                                  </vaadin-tab>
                              </vaadin-tabs>
                              <div id="tabContent">
                                  ${this.currentTab === 0
                                      ? html`
                                            <cxl-customer-grid
                                                .items=${this.data.customers}
                                            >
                                            </cxl-customer-grid>
                                        `
                                      : nothing}
                                  ${this.currentTab === 1
                                      ? html`
                                            <cxl-order-grid
                                                .items=${this.data.orders}
                                            >
                                            </cxl-order-grid>
                                        `
                                      : nothing}
                                  ${this.currentTab === 2
                                      ? html`
                                            <cxl-subscription-grid
                                                .items=${this.data
                                                    .subscriptions}
                                            >
                                            </cxl-subscription-grid>
                                        `
                                      : nothing}
                                  ${this.currentTab === 3
                                      ? html`
                                            <cxl-membership-grid
                                                .items=${this.data.memberships}
                                            >
                                            </cxl-membership-grid>
                                        `
                                      : nothing}
                              </div>
                          `
                        : nothing}
                </div>
            </div>
        `;
    }
    async search() {
        this._pending = true;
        this.data = Object.assign(Object.assign({}, this.data), {
            customers: await this.searchCustomers(),
        });
        this.data = Object.assign(Object.assign({}, this.data), {
            orders: await this.searchOrders(),
        });
        this.data = Object.assign(Object.assign({}, this.data), {
            subscriptions: await this.searchSubscriptions(),
        });
        this.data = Object.assign(Object.assign({}, this.data), {
            memberships: await this.searchMemberships(),
        });
        this._pending = false;
    }
    async searchCustomers() {
        return (
            await new CustomerCollection({
                params: { search: this.textField.value },
            }).get()
        ).items;
    }
    async searchMemberships() {
        return (
            await new MembershipCollection({
                params: { search: this.textField.value },
            }).get()
        ).items;
    }
    async searchOrders() {
        return (
            await new OrderCollection({
                params: { search: this.textField.value },
            }).get()
        ).items;
    }
    async searchSubscriptions() {
        return (
            await new SubscriptionCollection({
                params: { search: this.textField.value },
            }).get()
        ).items;
    }
    selectedChanged(event) {
        this.currentTab = event.detail.value;
    }
};
__decorate(
    [property({ type: Boolean })],
    WPSearchElement.prototype,
    "_pending",
    void 0
);
__decorate(
    [property({ type: Number })],
    WPSearchElement.prototype,
    "currentTab",
    void 0
);
__decorate(
    [property({ type: Object })],
    WPSearchElement.prototype,
    "data",
    void 0
);
__decorate(
    [query("vaadin-text-field")],
    WPSearchElement.prototype,
    "textField",
    void 0
);
WPSearchElement = __decorate([customElement("wp-search")], WPSearchElement);
export { WPSearchElement };
