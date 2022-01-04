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
import "@vaadin/vaadin-accordion";
import { css, customElement, html } from "lit-element";
import { BaseElement } from "../../base-elements/BaseElement";
let CXLKnowledgeBaseElement = class CXLKnowledgeBaseElement extends BaseElement {
    static get styles() {
        return [super.styles, css``];
    }
    render() {
        return html`
            <h1>Frequently Asked Questions:</h1>
            <vaadin-accordion>
                <vaadin-accordion-panel>
                    <div slot="summary">Question #1</div>
                    Answer #1
                </vaadin-accordion-panel>
                <vaadin-accordion-panel>
                    <div slot="summary">Question #2</div>
                    Answer #2
                </vaadin-accordion-panel>
                <vaadin-accordion-panel>
                    <div slot="summary">Question #3</div>
                    Answer #3
                </vaadin-accordion-panel>
            </vaadin-accordion>
            <h1>Resources:</h1>
            <vaadin-list-box>
                <vaadin-item><a href="Link #1">Link #1</a></vaadin-item>
                <vaadin-item><a href="Link #2">Link #2</a></vaadin-item>
                <vaadin-item><a href="Link #3">Link #3</a></vaadin-item>
            </vaadin-list-box>
        `;
    }
};
CXLKnowledgeBaseElement = __decorate(
    [customElement("cxl-knowledge-base")],
    CXLKnowledgeBaseElement
);
export { CXLKnowledgeBaseElement };