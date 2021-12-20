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
import "@vaadin/vaadin-select";
import { css, customElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { cache } from "lit-html/directives/cache";
import { config } from "../../config";
import { Order } from "../../models";
import { navigateExternal } from "../../utilities";
import { ViewElement } from "../../base-elements/ViewElement";
import "../refund/cxl-refund-grid";
import "./cxl-order-details";
let CXLOrderViewElement = class CXLOrderViewElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._tabIndex = 0;
        this._itemType = Order;
    }
    static get styles() {
        return [
            super.styles,
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
    async getItem() {
        const item = await super.getItem();
        await Promise.all([
            item.getRefunds(),
            item.getCoupons(),
            item.getCustomer(),
        ]);
        return item;
    }
    render() {
        var _a, _b, _c, _d;
        return html`
            <vaadin-split-layout orientation="vertical">
                <div class="full-height grid gap">
                    <div class="column-gap columns grid">
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
                    </div>
                    <cxl-order-details .item=${this.item}></cxl-order-details>
                </div>
                <div id="tabs">
                    <vaadin-tabs @selected-changed="${this._selectedChanged}">
                        <vaadin-tab>
                            Refunds
                            (${(_c =
                                (_b =
                                    (_a = this.item) === null || _a === void 0
                                        ? void 0
                                        : _a.refunds) === null || _b === void 0
                                    ? void 0
                                    : _b.total) !== null && _c !== void 0
                                ? _c
                                : 0})
                        </vaadin-tab>
                    </vaadin-tabs>
                    <div id="tabContent">
                        ${cache(
                            this._tabIndex === 0
                                ? html`<cxl-refund-grid
                                      order-id=${(_d = this.item) === null ||
                                      _d === void 0
                                          ? void 0
                                          : _d.id}
                                  ></cxl-refund-grid>`
                                : nothing
                        )}
                    </div>
                </div>
            </vaadin-split-layout>
        `;
    }
    _selectedChanged(e) {
        this._tabIndex = e.detail.value;
    }
};
__decorate(
    [property({ type: Number })],
    CXLOrderViewElement.prototype,
    "_tabIndex",
    void 0
);
CXLOrderViewElement = __decorate(
    [customElement("cxl-order-view")],
    CXLOrderViewElement
);
export { CXLOrderViewElement };
