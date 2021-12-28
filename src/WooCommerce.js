import { config } from "./config";

class WooCommerce {
    async get({ endpoint, params = {}, version = 3 }) {
        var queryString = Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&");

        const response = await fetch(
            `${config.wordpress.url}/wp-json/wc/v${version}/${endpoint}?${queryString}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (response.status === 403 || response.status === 404)
            throw new Error({ response });

        // Get response headers
        let headers = {};

        for (let entry of response.headers.entries()) {
            headers[entry[0]] = entry[1];
        }

        return { data: await response.json(), headers };
    }
}

export const wooCommerce = new WooCommerce();
