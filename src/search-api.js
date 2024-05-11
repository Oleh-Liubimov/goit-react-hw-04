import axios from "axios";

const key = "orZoioZV2QAptkCRfP702Dykifhb0x2RWQqlx5z5wnE";
export const perPage = 15;




axios.defaults.baseURL = "https://api.unsplash.com/";

export async function fetchImagesWithQuery(query,page) {
    const response = axios.get(`/search/photos?client_id=${key}&page=${page}&per_page=${perPage}&query=${query}`);
    return response
}
