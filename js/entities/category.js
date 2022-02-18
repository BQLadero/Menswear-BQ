'use strict';
import {
    InvalidAccessConstructorException,
    EmptyValueException,
} from '../shoppingCart/exceptions.js';

class Category {
    #title;
    #description;

    constructor(title, description) {
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!title) throw new EmptyValueException("title");

        this.#title = title;
        //Al ser opcional la descriión, no comprobamos su entrada
        this.#description = description;
    }

    get title() {
        return this.#title;
    }
    set title(value) {
        if (!value) throw new EmptyValueException("title");
        this.#title = value;
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        this.#description = value;
    }
}

export { Category };