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
import "@conversionxl/cxl-lumo-styles";
import { Router } from "@vaadin/router";
import "@vaadin/vaadin-app-layout";
import "@vaadin/vaadin-app-layout/vaadin-drawer-toggle";
import "@vaadin/vaadin-icon";
import "@vaadin/vaadin-tabs";
import {
    css,
    customElement,
    html,
    LitElement,
    property,
    query,
} from "lit-element";
import { routes } from "../../routes";
import { navigate } from "../../utilities";
let CXLDashboardElement = class CXLDashboardElement extends LitElement {
    constructor() {
        super(...arguments);
        this._selectedTab = 0;
    }
    static get styles() {
        return css`
            :host {
                display: block;
                font-family: var(--lumo-font-family);
                height: 100vh;
            }

            main {
                height: 100%;
            }

            #navbarContent {
                padding: 0.5rem 1rem 0.5rem 0;
            }

            #tabContent {
                height: 100%;
                overflow: hidden;
            }

            .padding-right {
                padding-right: 1rem;
            }

            .space-between {
                display: flex;
                flex-grow: 1;
                justify-content: space-between;
            }
        `;
    }
    render() {
        return html`
            <vaadin-app-layout>
                <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
                <span class="space-between" id="navbarContent" slot="navbar">
                    <vaadin-tab>
                        <a href="/">CXL Customer Service</a>
                    </vaadin-tab>
                    <vaadin-button
                        @click=${() => navigate("/search")}
                        theme="primary"
                    >
                        <vaadin-icon icon="vaadin:search"></vaadin-icon>
                    </vaadin-button>
                </span>
                <div
                    slot="drawer"
                    orientation="vertical"
                    theme="minimal"
                    style="margin: 0 auto; flex: 1;"
                >
                    <vaadin-tabs
                        selected=${this._selectedTab}
                        orientation="vertical"
                        @selected-changed=${this._selectedChanged.bind(this)}
                    >
                        <vaadin-tab>
                            <a href="/customers">Dashboard</a>
                        </vaadin-tab>
                        <vaadin-tab>
                            <a
                                href="https://app.clickup.com/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Knowledge Base
                            </a>
                        </vaadin-tab>
                    </vaadin-tabs>
                </div>
                <main></main>
            </vaadin-app-layout>
        `;
    }
    _selectedChanged(e) {
        this._selectedTab = e.detail.value;
    }
    firstUpdated() {
        this.layout.drawerOpened = false;
        const router = new Router(this.main);
        router.setRoutes(routes);
        window.addEventListener("vaadin-router-location-changed", (e) => {
            switch (e.detail.location.pathname.split("/")[1]) {
                case "knowledge-base":
                    this._selectedTab = 1;
                    break;
                default:
                    this._selectedTab = 0;
            }
        });
    }
};
__decorate(
    [property({ type: Number })],
    CXLDashboardElement.prototype,
    "_selectedTab",
    void 0
);
__decorate(
    [query("vaadin-app-layout")],
    CXLDashboardElement.prototype,
    "layout",
    void 0
);
__decorate([query("main")], CXLDashboardElement.prototype, "main", void 0);
CXLDashboardElement = __decorate(
    [customElement("cxl-dashboard")],
    CXLDashboardElement
);
export { CXLDashboardElement };
