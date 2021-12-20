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
import "@vaadin/vaadin-login";
import { css, customElement, html, query } from "lit-element";
import { config } from "../config";
import { navigate } from "../utilities";
import { BaseElement } from "../base-elements/BaseElement";
let WPLoginElement = class WPLoginElement extends BaseElement {
    static get styles() {
        return [...super.styles, css``];
    }
    render() {
        return html`
            <vaadin-login-overlay
                description="Please login using your credentials"
            >
                <h3 slot="title" style="color: #fff">${config.title}</h3>
            </vaadin-login-overlay>
            <vaadin-dialog id="feedbackDialog">
                <template>Login is being processed...</template>
            </vaadin-dialog>
            <vaadin-dialog id="supportDialog">
                <template>Please contact support.</template>
            </vaadin-dialog>
            <script>
                window.addEventListener("WebComponentsReady", function () {
                    var i18n = Object.assign({}, vaadinLoginOverlay.i18n, {
                        additionalInformation:
                            "For this demo, use admin/admin to a successful login.",
                    });

                    vaadinLoginOverlay.i18n = i18n;

                    vaadinLoginOverlay.addEventListener(
                        "forgot-password",
                        function () {
                            this.supportDialog.opened = true;
                        }
                    );
                });
            </script>
        `;
    }
    firstUpdated() {
        this.overlay.opened = true;
        this.overlay.addEventListener("login", this.login);
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
                const { token } = await response.json();
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
};
__decorate(
    [query("#feedbackDialog")],
    WPLoginElement.prototype,
    "feedbackDialog",
    void 0
);
__decorate(
    [query("#supportDialog")],
    WPLoginElement.prototype,
    "supportDialog",
    void 0
);
__decorate(
    [query("vaadin-login-overlay")],
    WPLoginElement.prototype,
    "overlay",
    void 0
);
WPLoginElement = __decorate([customElement("wp-login")], WPLoginElement);
export { WPLoginElement };
