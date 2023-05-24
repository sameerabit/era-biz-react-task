import { webService } from './webService';

export const loginService = {

    login: (values) => {
        // use constant for configs

        let header = {
        }
        return webService.call(
            'post',
            'http://localhost:8080/api/v1/login',
            values,
            header
        );
    }

}