import commonjs from "@rollup/plugin-commonjs";
import { esbuildPlugin } from "@web/dev-server-esbuild";
import { fromRollup } from "@web/dev-server-rollup";
import { visualRegressionPlugin } from "@web/test-runner-visual-regression/plugin";
import resolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default {
    plugins: [
        esbuildPlugin({ ts: true }),
        fromRollup(commonjs)({
            include: [
                "node_modules/oauth-1.0a/oauth-1.0a.js",
                "src/WooCommerce.js",
            ],
        }),
        fromRollup(resolve)({
            include: [
                "node_modules/oauth-1.0a/oauth-1.0a.js",
                "src/WooCommerce.js",
            ],
        }),
        fromRollup(nodePolyfills)({
            include: [
                "node_modules/oauth-1.0a/oauth-1.0a.js",
                "src/WooCommerce.js",
            ],
        }),
        visualRegressionPlugin({
            update: process.argv.includes("--update-visual-baseline"),
        }),
    ],
};
