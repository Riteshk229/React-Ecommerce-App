import axios from "axios";
const API_ROOT = "https://fakedata-ch1p.onrender.com"

export async function getProducts() {
    return await axios.get(`${API_ROOT}/products`)
        .then(response => {
            return {
                success: true,
                data: response.data
            }
        })
        .catch((err) => {
            console.log(`Error in fetching Products from Data Base ..!!`, err.toJSON);
            return {
                error: err.message,
                success: false
            }
        });
};

export async function getProduct(productID) {
    return await axios.get(`${API_ROOT}/products/${productID}`)
        .then(response => {
        return {
            success: true,
            data: response.data
        }
    })
    .catch((err) => {
        console.log(`Error in fetching Product from Data Base ..!!`, err.toJSON);
        return {
            error: err.message,
            success: false
        }
    });
};

export async function editProduct(editedProduct,productID) {
    return await axios.patch(`${API_ROOT}/products/${productID}`, { ...editedProduct })
    .then(response => { 
        return {
               success: true,
               data: response.data
           }
        })
        .catch((err) => {
            console.log(`Error in fetching Product from Data Base ..!!`, err.toJSON);
            return {
                error: err.message,
                success: false
            }
        });
};

export async function addNewProduct(newProduct) {
    return await axios.post(`${API_ROOT}/products`, {
        title: newProduct.title,
        rating: newProduct.rating,
        price: newProduct.price,
        description: newProduct.description,
        image: newProduct.image,
    })
        .then(response => {
            console.log(response);
            return {
                success: true,
                data : response.data
            }
        })
        .catch((err) => {
            console.log(`Error in adding Product to the Database ..!!`, err.toJSON);
            return {
                error: err.message,
                success: false
            }
        });
};

export async function delProduct(productId) {
    return await axios.delete(`${API_ROOT}/products/${productId}`)
        .then(response => {
            return {
                success: true
            }
        })
        .catch((err) => {
            console.log(`Error in deleting Product..!! `, err.toJSON);
            return {
                error: err.message,
                success : false
            }
    })
}

export async function getCartItems(userId) {
    return await axios.get(`${API_ROOT}/cart/?userId=${userId}`)
        .then(response => {
            console.log("carttttttt",response);
            return {
                data: response.data,
                success : true
            }
        })
        .catch((err) => {
            console.log(`Error in fetching cart items for the user ..!!`, err.toJSON);
            return {
                error: err.message,
                success : false
            }
        });
}