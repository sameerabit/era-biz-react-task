import Cookies from "js-cookie";
import { loginService } from "../services/loginService";
import { webService } from "../services/webService";

const initialState = {
    authenticated: false,
    user: null
};

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILURE = 'AUTH_FAILURE';
const AUTH_STATUS = 'AUTH_STATUS';
const CHANGE_FAVOURITES = 'CHANGE_FAVOURITES';

const authReducer = (state = initialState, action) => {
    // Handle actions and update state accordingly
    // Return the updated state

    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                authenticated: true,
                user: action.payload.user
            };
        case AUTH_FAILURE:
            return {
                ...state,
                authenticated: false,
                user: null
            };
        case AUTH_STATUS:
            return {
                ...state,
                authenticated: action.payload.authenticated,
                user: action.payload.user
            };
        default:
            return state;
    }
};

const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    payload: {
        user
    }
});

const authFailure = () => ({
    type: AUTH_FAILURE,
    payload: {}
});

const authStatus = (authenticated, user) => ({
    type: AUTH_STATUS,
    payload: {
        authenticated,
        user
    }
});

const changeFavourites = (characterIds) => ({
    type: CHANGE_FAVOURITES,
    payload: characterIds
});

const checkAuthentication = () => {
    return async (dispatch) => {
        try {
            const authToken = Cookies.get("authToken");
            if (authToken) {
                // fetch the user with the token
                const userResponse = await webService.call('get', `check-login`, {}, {
                    'Authorization': `Bearer ${authToken}`
                });

                if (userResponse.user) {
                    // if a user is returned the token belongs to a user
                    dispatch(authSuccess(userResponse.user));
                } else {
                    // if a user is not there the app should start from the login
                    dispatch(authStatus(false, null));
                }
            } else {
                dispatch(authStatus(false, null));
            }
        } catch (error) {
            dispatch(authStatus(false, null));
        }
    };
};

const loginUser = (values) => {

    return async (dispatch) => {
        try {
            // login user with the username
            const loginResponse = await loginService.login(values);

            Cookies.set('authToken', loginResponse.token);
            dispatch(authSuccess(loginResponse.user));
        } catch (error) {
            dispatch(authFailure());
        }
    }
}

const registerUser = (values) => {

    return async (dispatch) => {
        try {
            // login user with the username
            const registerResponse = await loginService.register(values);

            Cookies.set('authToken', registerResponse.token);
            dispatch(authSuccess(registerResponse.user));
        } catch (error) {
            dispatch(authFailure());
        }
    }
}

const logoutUser = () => {
    return async (dispatch) => {
        try {
            loginService.logout();
            Cookies.remove('authToken');
            dispatch(authStatus(false, null));
        } catch (error) {
            dispatch(authFailure());
        }
    }
}

const authenticationError = (username) => {
    return async (dispatch) => {
        try {
            alert(`Authentication error with the user: ${username}`);

            dispatch(logoutUser(username));
        } catch (error) {
            Cookies.remove('authToken');
            dispatch(authStatus(false, null));
        }
    }
}

export {
    authReducer,
    checkAuthentication,
    loginUser,
    registerUser,
    logoutUser,
    changeFavourites,
    authenticationError
};