import { visualDiff } from "@web/test-runner-visual-regression";
// import "./cxl-dashboard";

it("can diff an element", async () => {
    const element = document.createElement("cxl-dashboard");
    document.body.appendChild(element);

    await visualDiff(element, "cxl-dashboard");
});
