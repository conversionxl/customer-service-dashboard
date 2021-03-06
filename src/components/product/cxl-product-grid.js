import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ProductCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";

@customElement("cxl-product-grid")
export class CXLProductGridElement extends GridElement {
    _collectionType = ProductCollection;

    render() {
        console.log(this.items);
        return html`
            <vaadin-grid>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Name"
                    path="name"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Price"
                    path="price"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
}
