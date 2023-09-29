import axios from "axios";
const API_ROOT = "https://fakedata-ch1p.onrender.com"

export async function getProducts(order) {
    if (order === "asc") {
        return await axios.get(`${API_ROOT}/products/?sort=${order}`)
        .then(item => {
            return item.data.sort((a, b) => a.price - b.price);
        })
    }
    else if (order === "desc") {
        return await axios.get(`${API_ROOT}/products/?sort=${order}`)
        .then(item => {
            return item.data.sort((a, b) => b.price - a.price);
        })
    }
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
    return axios.put(`${API_ROOT}/products/${productID}`,{...editedProduct})
}