import axios from "axios";
const API_ROOT = "https://fakestoreapi.com"

export async function getProducts () {
    return await axios.get(`${API_ROOT}/products`)
        .then(item => {
            return item.data
        })
}