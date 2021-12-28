import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { BaseElement } from "../../base-elements/BaseElement";
import { config } from "../../config";
import { notify } from "../../utilities";

@customElement("wp-page")
export class WPPageElement extends BaseElement {
    @property({ type: Object }) page;
    @property({ type: Object }) substitute = {};
    @property({ type: Boolean }) error;

    location;

    render() {
        return html`
            ${this.error ? html`Something went wrong.` : nothing}
            ${unsafeHTML(this.page?.content)}
        `;
    }

    async firstUpdated(_changedProperties: any) {
        super.firstUpdated(_changedProperties);

        if (this.location) {
            this.page = { ...this.location.params };
        }

        try {
            const content = this.parse(await this.get());

            this.page = {
                ...this.page,
                ...{ content },
            };
        } catch (error) {
            this.error = error;
            notify({ message: this.error, theme: "error" });
        }
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
