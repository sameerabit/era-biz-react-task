import { webService } from './webService';

export const loginService = {

    login: (values) => {
        // use constant for configs

        let header = {
        }
        return webService.call(
            'post',
            'login',
            values,
            header
        );


    }

}