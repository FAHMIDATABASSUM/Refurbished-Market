import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/product", 
    withCredentials: true,
  });

export const uploadProduct = (formData) =>
  API.post("/upload-product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });



export const getProductByUserId = (userId, search = '') =>
  API.get(`/get-product-by-id/${userId}`, {
    params: { search },
  });

  export const getProductById = (id) => API.get(`/get-product/${id}`);
  export const deleteProduct = (id) =>API.delete(`/delete-product/${id}`)

  export const updateProductById = (id, data) => API.put(`/update-product/${id}`,data);
  export const getAllProduct = () =>API.get('/get-all-products')
  export const updateProductStatus=(id)=>API.put(`/update-product-status/${id}`)
  export const getProductByStatus = ( search = '') =>
  API.get('/get-product-by-status', {
    params: { search },
  });


  export const postWish = (productId,userId) =>API.post('/post-wish',{productId,userId})
  export const postCart = (productId,userId) =>API.post('/post-cart',{productId,userId})
  export const getWish = (userId) =>API.get(`/get-wish/${userId}`)
  export const deleteWish = (wishId) =>API.delete(`/delete-wish/${wishId}`)
  export const getCart = (userId) =>API.get(`/get-cart/${userId}`)
  export const deleteCart = (cartId) =>API.delete(`/delete-cart/${cartId}`)
  export const updateCartQuantity = (cartId,newQuantity) =>API.put(`/update-quantity/${cartId}`,{newQuantity})