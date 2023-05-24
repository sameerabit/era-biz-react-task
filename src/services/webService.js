import axios from 'axios';

export const webService = {

    call: (method, url, data, headers) => {
        return axios({
            method: method,
            url: url,
            data: data,
            headers
        }).then(({ data }) => data);;
    }

}