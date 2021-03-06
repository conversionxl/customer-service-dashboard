import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import style from "./index.css";
import template from "./index.html";

@customElement("shell-component")
export class ShellComponent extends LitElement {
    public static get styles() {
        return style;
    }

    public render = template.bind(this);
}
