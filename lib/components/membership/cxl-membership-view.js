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
import { css, customElement, html } from "lit-element";
import { Membership } from "../../models";
import { navigate } from "../../utilities";
import { ViewElement } from "../../base-elements/ViewElement";
let CXLMembershipViewElement = class CXLMembershipViewElement extends ViewElement {
    constructor() {
        super(...arguments);
        this._itemType = Membership;
    }
    static get styles() {
        return [super.styles, css``];
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        console.log(this.item);
        return html`
            <div class="gap grid">
                <div class="columns gap grid">
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
                </div>
                <hr />
                <div class="column-gap columns grid">
                    <vaadin-text-field
                        disabled
                        label="ID"
                        value=${(_a = this.item) === null || _a === void 0
                            ? void 0
                            : _a.id}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Product Name"
                        value=${(_b = this.item) === null || _b === void 0
                            ? void 0
                            : _b.productName}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Status"
                        value=${(_c = this.item) === null || _c === void 0
                            ? void 0
                            : _c.status}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Date Created"
                        value=${(_d = this.item) === null || _d === void 0
                            ? void 0
                            : _d.dateCreated}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Start Date"
                        value=${(_e = this.item) === null || _e === void 0
                            ? void 0
                            : _e.startDate}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="End Date"
                        value=${(_f = this.item) === null || _f === void 0
                            ? void 0
                            : _f.endDate}
                    ></vaadin-text-field>
                </div>
            </div>
        `;
    }
};
CXLMembershipViewElement = __decorate(
    [customElement("cxl-membership-view")],
    CXLMembershipViewElement
);
export { CXLMembershipViewElement };
