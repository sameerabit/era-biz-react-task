import { webService } from './webService';
import Cookies from "js-cookie";

export const loginService = {

    login: (values) => {

        let header = {
        }
        return webService.call(
            'post',
            'login',
            values,
            header
        );
    },

    register: (values) => {
        let header = {
        }
        return webService.call(
            'post',
            'register',
            values,
            header
        );
    },

    logout: (values) => {

        let header = {
            'Authorization': 'Bearer ' + Cookies.get("authToken")
        }
        return webService.call(
            'post',
            'logout',
            values,
            header
        );
    },

}