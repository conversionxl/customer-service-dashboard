import { visualRegressionPlugin } from "@web/test-runner-visual-regression/plugin";

export default {
    testRunnerHtml: (testFramework) =>
        `
            <!DOCTYPE html>
            <html>
                <body>
                    <script>window.localStorage.token = ""</script>
                    <script type="module" src="${testFramework}"></script>
                </body>
            </html>
        `,
    plugins: [
        visualRegressionPlugin({
            manual: process.argv.includes("--manual"),
            update: process.argv.includes('--update-visual-baseline'),
        }),
    ],
};
