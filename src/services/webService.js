import axios from 'axios';
import { CONFIG } from "../constants";


export const webService = {

    call: (method, url, data, headers) => {
        return axios({
            method: method,
            url: CONFIG.BACKEND_URL + url,
            data: data,
            headers
        }).then(({ data }) => data);;
    }

}