import { webService } from './webService';
import { BACKEND_URL } from "../constants";
import Cookies from "js-cookie";



export const productService = {

    saveProduct: (values) => {
        // use constant for configs

        values.image = values.image[0].originFileObj;

        let header = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + Cookies.get("authToken")
        }
        return webService.call(
            'post',
            'http://localhost:8080/api/v1/products',
            values,
            header
        );
    },

    getAll: (page) => {
        // use constant for configs

        let header = {
            'Authorization': 'Bearer ' + Cookies.get("authToken")
        }
        return webService.call(
            'get',
            'products?page=' + page,
            {},
            header
        );
    },

    getProductImage: (id) => {

        let header = {
            'Authorization': 'Bearer ' + Cookies.get("authToken")
        }
        return webService.call(
            'get',
            `products/${id}/image`,
            {},
            header
        );
    }

}