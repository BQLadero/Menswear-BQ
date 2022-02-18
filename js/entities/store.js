'use strict';
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
} from '../shoppingCart/exceptions.js';
import { Coords } from './coords.js';

class Store {
    #cif;
    #name;
    #address;
    #phone;
    #coords;

    constructor(cif, name, address, phone, coords) {
        if (!new.target) throw new InvalidAccessConstructorException();

        if (!cif) throw new EmptyValueException("cif");
        if (!name) throw new EmptyValueException("name");
        if (!address) throw new EmptyValueException("address");

        //Testeo de que el atributo phone contiene 9 números
        if (!/^[0-9]{9}$/.test(phone)) throw new InvalidValueException("phone", phone);
        if (!(coords instanceof Coords)) throw new Error("El elemento introducido no es un objecto Coordenada");

        this.#cif = cif;
        this.#name = name;
        this.#address = address;
        this.#phone = phone;
        this.#coords = coords;
    }

    get cif() {
        return this.#cif;
    }
    set cif(value) {
        if (!value) throw new EmptyValueException("cif");
        this.#cif = value;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        if (!value) throw new EmptyValueException("name");
        this.#name = value;
    }

    get address() {
        return this.#address;
    }
    set address(value) {
        if (!value) throw new EmptyValueException("address");
        this.#address = value;
    }

    get phone() {
        return this.#phone;
    }
    set phone(value) {
        if (!/^[0-9]{9}$/.test(value)) throw new InvalidValueException("phone");
        this.#phone = value;
    }

    get coords() {
        return this.#coords;
    }
    set coords(value) {
        if (!(value instanceof Coords)) throw new Error("El elemento introducido no es un objecto Coordenada");
        this.#coords = value;
    }

    toString() {
        return "CIF: " + this.#cif + " Nombre: " + this.#name + " Dirección: "
            + this.#address + " Teléfono: " + this.#phone + " Coordenadas | Latitud: "
            + this.#coords.latitude + " Coordenadas | Longitud: " + this.#coords.longitude + ".";
    }
}

export { Store };