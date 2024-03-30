import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});

const handleRequest = async (request) => {
    const response = await request({});

    return response;
}

const httpClientHelper = {
    async post(url, data) {
        const request = (config = {}) => $host.post(url, { ...data }, config);
        const response = await handleRequest(request);

        return response.data || {};
    },

    async get(url) {
        const request = (config = {}) => $host.get(url, config);
        const response = await handleRequest(request);

        return response.data || {};
    }
}

export default httpClientHelper;