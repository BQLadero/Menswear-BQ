'use strict';

class BaseException extends Error {
	constructor(message = "", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "BaseException";
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BaseException)
		}
	}
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
	constructor(fileName, lineNumber) {
		super('El constructor no se puede llamar como una función.', fileName, lineNumber);
		this.name = "InvalidAccessConstructorException";
	}
}

//Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
	constructor(param, fileName, lineNumber) {
		super('ERRROR || Error en el valor ' + param + ' que no puede estar vacío.', fileName, lineNumber);
		this.param = param;
		this.name = "EmptyValueException";
	}
}

//Excepción de valor inválido
class InvalidValueException extends BaseException {
	constructor(param, fileName, lineNumber) {
		super('ERRROR || Error en el parametro ' + param + ' tiene un valor inválido.', fileName, lineNumber);
		this.param = param;
		this.name = "InvalidValueException";
	}
}

export {
	BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException
};  