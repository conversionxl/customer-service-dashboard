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
import { customElement, html } from "lit-element";
import { ProductCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";
let CXLProductGridElement = class CXLProductGridElement extends GridElement {
    constructor() {
        super(...arguments);
        this._collectionType = ProductCollection;
    }
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
};
CXLProductGridElement = __decorate(
    [customElement("cxl-product-grid")],
    CXLProductGridElement
);
export { CXLProductGridElement };
