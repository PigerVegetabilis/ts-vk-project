import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

export const fetchData = async (page: number, limit: number) => {
    const response = await api.get('/items', {
        params: {_page: page, _limit: limit}
    });

    return {
        items: response.data,
        hasMore: response.headers.link?.includes('rel="next"')
    };
};

export const createItem = async (item: any) => {
    const response = await api.post('/items', item);
    return response.data;
}