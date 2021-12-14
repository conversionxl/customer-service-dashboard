import { customElement, html, property } from "lit-element";
import { BaseElement } from "../base-elements/BaseElement";
import { config } from "../config";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

@customElement("wp-page")
export class WPPageElement extends BaseElement {
    @property({ type: Object }) page;

    @property({ type: Object }) substitute = {};

    location;

    render() {
        return html`${unsafeHTML(this.page?.content)}`;
    }

    async firstUpdated(_changedProperties: any) {
        super.firstUpdated(_changedProperties);

        if (this.location) {
            this.page = { ...this.location.params };
        }

        const content = this.parse(await this.get());

        this.page = {
            ...this.page,
            ...{ content },
        };
    }

    async get() {
        const response = await fetch(
            `${config.wordpress.url}/wp-json/wp/v2/pages/${this.page.id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        ).then((response) => response.json());

        return response.content.rendered;
    }

    parse(content) {
        Object.keys(this.substitute).map((key) => {
            content = content.replace(key, this.substitute[key]);
        });

        return content;
    }
}
