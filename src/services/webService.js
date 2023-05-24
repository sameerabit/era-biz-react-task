import axios from 'axios';
import { BACKEND_URL } from "../constants";


export const webService = {

    call: (method, url, data, headers) => {
        return axios({
            method: method,
            url: BACKEND_URL + url,
            data: data,
            headers
        }).then(({ data }) => data);;
    }

}