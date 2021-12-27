import { visualDiff } from "@web/test-runner-visual-regression";
import "./index";

it("can diff an element", async () => {
    const element = document.createElement("shell-component");

    document.body.appendChild(element);

    await visualDiff(element, "shell-component");
});
