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
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-filter-column";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
import { customElement, html } from "lit-element";
import { MembershipCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";
let CXLMembershipGridElement = class CXLMembershipGridElement extends GridElement {
    constructor() {
        super(...arguments);
        this._baseRoute = "membership";
        this._collectionType = MembershipCollection;
        this.type = "membership";
    }
    get endpoint() {
        return `memberships/members`;
    }
    render() {
        return html`
            <vaadin-grid .items=${this.items}>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Product Name"
                    path="productName"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Date Created"
                    path="dateCreated"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="Start Date"
                    path="startDate"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="End Date"
                    path="endDate"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="Status"
                    path="status"
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    .renderer=${this._boundActionColumnRenderer}
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
    // Filters don't work
    // This is overidden because we cannot pass `order` as a parameter for the `memberships/members` enpoint.
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
                    { orderby, page: ++params.page, per_page: params.pageSize }
                ),
            })
        ).get();
        callback(list.getItems(), list.getTotal());
    }
};
CXLMembershipGridElement = __decorate(
    [customElement("cxl-membership-grid")],
    CXLMembershipGridElement
);
export { CXLMembershipGridElement };
