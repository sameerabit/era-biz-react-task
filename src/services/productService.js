import { webService } from './webService';

export const productService = {

    saveProduct: (values) => {
        // use constant for configs

        values.image = values.image[0].originFileObj;

        let header = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer 3|tV0N8y5ifCHfwFJTiVZWO7BPn6nFIfMtAfTRBx42'
        }
        return webService.call(
            'post',
            'http://localhost:8080/api/v1/products',
            values,
            header
        );
    }

}