import {
    InvalidAccessConstructorException
} from '../exceptions.js';
import { User } from '../entities/user.js'


let AuthenticationService = (function () {
    let instantiated;

    function init() { //Inicialización del Singleton
        class Authentication {

            constructor() {
                if (!new.target) throw new InvalidAccessConstructorException();
            }

            validateUser(username, password) {
                return (username === 'admin' && password === 'admin') ? true : false;
            }

            getUser(username) {
                let user = null;
                if (username === 'admin') user = new User('admin');
                return user;
            }
        }

        let auth = new Authentication();
        Object.freeze(auth);
        return auth;
    }
    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();


export default AuthenticationService;


