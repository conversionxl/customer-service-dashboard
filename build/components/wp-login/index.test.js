import { visualDiff } from "@web/test-runner-visual-regression";
import "./wp-login";
it("can diff an element", async () => {
    const element = document.createElement("wp-login");
    document.body.appendChild(element);
    await element.updateComplete;
    await visualDiff(
        document.querySelector("vaadin-login-overlay-wrapper"),
        "wp-login"
    );
});
