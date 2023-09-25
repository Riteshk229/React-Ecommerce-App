import axios from "axios";
const API_ROOT = "https://fakestoreapi.com"

export async function getProducts(order) {
    return await axios.get(`${API_ROOT}/products/?sort=${order}`)
        .then(item => {
            return item.data
        })
}

export async function getProduct(productID) {
    return await axios.get(`${API_ROOT}/products/${productID}`)
        .then(item => {
            return item.data;
        })
}

export async function editProduct(editedProduct,productID) {
    return axios.put(`${API_ROOT}/products/${productID}`,{...editProduct})
}