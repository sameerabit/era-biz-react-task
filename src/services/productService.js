import { webService } from './webService';
import Cookies from "js-cookie";
import ReactRecaptcha3 from 'react-google-recaptcha3';
import { CONFIG } from '../constants';


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
            'products',
            values,
            header
        );
    },

    uploadImage: (values, id) => {
        values.image = values.image.fileList[0].originFileObj;
        let header = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + Cookies.get("authToken")
        }
        return webService.call(
            'post',
            `products/${id}/image`,
            values,
            header
        );
    },

    updateProduct: (values) => {

        let header = {
            'Authorization': 'Bearer ' + Cookies.get("authToken")
        }
        return webService.call(
            'put',
            'products/' + values.id,
            values,
            header
        );
    },

    getAll: (page, filters) => {
        // use constant for configs
        let query = filters ? '&' + filters.field + '=' + filters.value : '';
        let header = {
            'Authorization': 'Bearer ' + Cookies.get("authToken")
        }
        return webService.call(
            'get',
            `products?page=${page}${query}`,
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
            `products / ${id} / image`,
            {},
            header
        );
    },

    deleteProduct: (id) => {

        let header = {
            'Authorization': 'Bearer ' + Cookies.get("authToken")
        }
        return webService.call(
            'delete',
            `products / ${id}`,
            {},
            header
        );
    },

}