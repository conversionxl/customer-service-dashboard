import { visualDiff } from "@web/test-runner-visual-regression";
import "./wp-page";

it("can diff an element", async () => {
    const element = document.createElement("wp-page");
    document.body.appendChild(element);

    await visualDiff(element, "wp-page");
});
