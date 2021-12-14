import "@vaadin/menu-bar";
import { css, customElement, html, property } from "lit-element";
import { nothing, render } from "lit-html";
import { cache } from "lit-html/directives/cache";
import { ViewElement } from "../../base-elements/ViewElement";
import { config } from "../../config";
import { Order } from "../../models";
import { navigateExternal } from "../../utilities";
import "../refund/cxl-refund-grid";
import "./cxl-order-details";

@customElement("cxl-order-view")
export class CXLOrderViewElement extends ViewElement {
    @property({ type: Number }) _tabIndex = 0;

    _itemType = Order;

    menuBarItems = [
        {
            text: "File",
            children: [{ text: "Open" }, { text: "Auto Save", checked: true }],
        },
        { component: "hr" },
        {
            text: "Edit",
            children: [{ text: "Undo", disabled: true }, { text: "Redo" }],
        },
        { text: "Help" },
    ];

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
                        <vaadin-button @click=${this.documentation}>
                            Documentation
                        </vaadin-button>
                        <vaadin-menu-bar
                            .items=${this.menuBarItems}
                        ></vaadin-menu-bar>
                    </div>
                    <cxl-order-details .item=${this.item}></cxl-order-details>
                </div>
                <div id="tabs">
                    <vaadin-tabs @selected-changed="${this._selectedChanged}">
                        <vaadin-tab>
                            Refunds (${this.item?.refunds?.total ?? 0})
                        </vaadin-tab>
                    </vaadin-tabs>
                    <div id="tabContent">
                        ${cache(
                            this._tabIndex === 0
                                ? html`
                                      <cxl-refund-grid
                                          order-id=${this.item?.id}
                                      ></cxl-refund-grid>
                                  `
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

    documentation() {
        const substitute = {
            "[[ORDER_LINK]]": `<a href="${config.wordpress.url}/wp-admin/post.php?post=${this.item?.id}&action=edit" target="_blank" rel="noreferrer noopener">Order Link</a>`,
        };
        const dialog = document.createElement("vaadin-dialog");

        dialog.renderer = (root) => {
            render(
                html`<wp-page
                    .substitute=${substitute}
                    .page=${{ id: "1045387" }}
                ></wp-page>`,
                root
            );
        };

        dialog.addEventListener("opened-changed", (event) => {
            if (!event.detail.value) {
                this.shadowRoot.removeChild(dialog);
            }
        });

        this.shadowRoot.appendChild(dialog);

        dialog.opened = true;
    }
}
