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
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-form-layout";
import { css, property } from "lit-element";
import { BaseElement } from "./BaseElement";
export class ViewElement extends BaseElement {
    constructor() {
        super(...arguments);
        this._getDisabled = false;
        this.pending = true;
    }
    static get styles() {
        return [
            ...super.styles,
            css`
                :host {
                    height: 100%;
                }

                :host([pending]) > * {
                    display: none !important;
                }

                :host([pending]) > #pending-message {
                    display: flex !important;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }

                :host(:not([pending])) #pending-message {
                    display: none;
                }
            `,
        ];
    }
    async updated(changedProperties) {
        var _a, _b;
        super.updated(changedProperties);
        if (
            changedProperties.has("item") &&
            (changedProperties.get("item") || {}).id !==
                ((_a = this.item) === null || _a === void 0 ? void 0 : _a.id)
        ) {
            if (
                !this._getDisabled &&
                !((_b = this.item) === null || _b === void 0
                    ? void 0
                    : _b._getCompleted)
            ) {
                this.item = await this.getItem();
            }
            this.pending = false;
        }
    }
    firstUpdated() {
        if (!this.item || !this.item._getCompleted) {
            if (this.location) {
                this.item = Object.assign({}, this.location.params);
            }
        }
    }
    async getItem() {
        return await new this._itemType(this.item).get();
    }
}
__decorate(
    [property({ type: Boolean, attribute: "get-disabled" })],
    ViewElement.prototype,
    "_getDisabled",
    void 0
);
__decorate([property({ type: Object })], ViewElement.prototype, "item", void 0);
__decorate(
    [property({ type: Boolean, reflect: true })],
    ViewElement.prototype,
    "pending",
    void 0
);
