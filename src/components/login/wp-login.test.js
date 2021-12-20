import { visualDiff } from "@web/test-runner-visual-regression";
import "./wp-login";

it("can diff an element", async () => {
    const element = document.createElement("wp-login");
    document.body.appendChild(element);

    await visualDiff(element, "wp-login");
});
