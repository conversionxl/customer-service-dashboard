import { visualRegressionPlugin } from "@web/test-runner-visual-regression/plugin";

export default {
    testRunnerHtml: (testFramework) =>
        `
            <html>
                <body>
                    <script>window.localStorage.token = ""</script>
                    <script type="module" src="${testFramework}"></script>
                </body>
            </html>
        `,
    plugins: [
        visualRegressionPlugin({
            update: process.argv.includes("--update-visual-baseline"),
        }),
    ],
};
