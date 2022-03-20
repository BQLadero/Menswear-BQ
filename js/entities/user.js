'use strict';
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
} from '../exceptions.js';

class User{
	//Campos privados
	#username;
	#preferences;
	constructor (username){
		if (!new.target) throw new InvalidAccessConstructorException();

		if (!username) throw new EmptyValueException("username");
		this.#username = username;
	}

	get username(){
		return this.#username;
	}

	get preferences(){
		return this.#preferences;
	}
	set preferences(value){
		this.#preferences = value;
	}
}
Object.defineProperty(User.prototype, "username", {enumerable: true});
Object.defineProperty(User.prototype, "preferences", {enumerable: true});

export {User};
