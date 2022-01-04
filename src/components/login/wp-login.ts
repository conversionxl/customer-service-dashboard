import "@vaadin/vaadin-login";
import { css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { BaseElement } from "../../base-elements/BaseElement";
import { config } from "../../config";
import { navigate } from "../../utilities";

@customElement("wp-login")
export class WPLoginElement extends BaseElement {
    @query("vaadin-login-overlay") overlay;

    static get styles() {
        return [...super.styles, css``];
    }

    render() {
        return html`
            <vaadin-login-overlay
                description="Please login using your credentials"
                opened
                @login=${this.login}
            >
                <h3 slot="title" style="color: #fff">${config.title}</h3>
            </vaadin-login-overlay>
        `;
    }

    async login(event) {
        const formData = new FormData();
        formData.append("username", event.detail.username);
        formData.append("password", event.detail.password);

        await fetch(`${config.wordpress.url}/wp-json/jwt-auth/v1/token`, {
            method: "POST",
            body: formData,
        })
            .then(async (response) => {
                const {
                    data: { token },
                } = await response.json();

                localStorage.setItem("token", token);

                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onBeforeEnter() {
        if (this.isAuthorized()) {
            navigate("/");
        }
    }
}
