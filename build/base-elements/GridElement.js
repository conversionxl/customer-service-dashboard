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
import { css, html, query } from "lit-element";
import { BaseElement } from "./BaseElement";
import { render } from "lit-html";
export class GridElement extends BaseElement {
    constructor() {
        super();
        this.params = {};
        this._boundActionColumnRenderer = this._actionColumnRenderer.bind(this);
    }
    get _props() {
        return {};
    }
    static get styles() {
        return [
            ...super.styles,
            css`
                :host {
                    flex: 1;
                }

                vaadin-grid {
                    height: 100%;
                }
            `,
        ];
    }
    firstUpdated() {
        if (!this.items) this.grid.dataProvider = this.dataProvider.bind(this);
        this._registerActiveItemChangedListener();
    }
    _actionColumnRenderer(root, column, rowData) {
        // This could be cleaned up.
        const path = rowData.item._getViewPath
            ? rowData.item._getViewPath(this)
            : `/${this._baseRoute}/view/${rowData.item.id}`;
        render(
            html`
                <vaadin-button @click=${this._navigate} href=${path}
                    >View</vaadin-button
                >
            `,
            root
        );
    }
    _registerActiveItemChangedListener() {
        this.grid.addEventListener("active-item-changed", (event) => {
            const item = event.detail.value;
            // @deprecated
            this._selectedItem = item;
            this.selectedItem = item;
            this.grid.selectedItems = item ? [item] : [];
        });
    }
    // filters don't work
    async dataProvider(params, callback) {
        const filter = Object.assign({}, this.filter);
        params.filters.map((_filter) => {
            filter[_filter.path] = _filter.value;
        });
        let order = "desc";
        let orderby = "id";
        params.sortOrders.map((_sortOrder) => {
            orderby = _sortOrder.path;
            order = _sortOrder.direction;
        });
        const list = await new this._collectionType(
            Object.assign(Object.assign({}, this._props), {
                params: Object.assign(
                    Object.assign(Object.assign({}, this.params), filter),
                    {
                        order,
                        // orderby,
                        page: ++params.page,
                        per_page: params.pageSize,
                    }
                ),
            })
        ).get();
        callback(list.getItems(), list.getTotal());
    }
}
__decorate([query("vaadin-grid")], GridElement.prototype, "grid", void 0);
