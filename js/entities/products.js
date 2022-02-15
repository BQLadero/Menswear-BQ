'use strict';
//Importación de clases de las diversas excepciones que vamos a utilizar
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
} from './exceptions.js';

class Product {
    //Creación de los atributos
    #serialNumber;
    #name;
    #price;
    #description;
    #tax;
    #images;
    constructor(serialNumber, name, price, description, tax = 0.1, images = []) {
        //Comprobación del que al constructor se le ha llamado con la etiqueta new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Posibles errores en los valores del constructor
        if (serialNumber < 0) throw new EmptyValueException("serialNumber");
        if (!name) throw new EmptyValueException("name");
        price = Number.parseFloat(price);
        if (!price || price <= 0) throw new InvalidValueException("price");

        //Al ser opcionales, pueden estar vacio, pero si se pasar algun dato hay que comprobarlo
        if (tax !== "") {
            tax = Number.parseFloat(tax);
            if (!tax || tax <= 0) throw new InvalidValueException("tax");
            this.#tax = tax;
        } else if (tax === "") {
            this.#tax = tax;
        } else throw new InvalidValueException("tax");

        if (images !== "") {
            if (!Array.isArray(images)) throw new InvalidValueException("images");
            this.#images = images;
        } else if (images === "") {
            this.#images = images;
        } else throw new InvalidValueException("images");

        //Una vez que han sido validados los datos, se agregan a cada atributo correspondiente
        this.#serialNumber = serialNumber;
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.#tax = tax;
        this.#images = images;
    }

    //Getter y Setter de los atributos
    get serialNumber() {
        return this.#serialNumber;
    }
    set serialNumber(value) {
        if (!value) throw new EmptyValueException("serialNumber");
        this.#serialNumber = value;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        if (!value) throw new EmptyValueException("name");
        this.#name = value;
    }

    get price() {
        return this.#price;
    }
    set price(value) {
        if (!value) throw new EmptyValueException("price");
        this.#price = value;
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        this.#description = value;
    }

    get tax() {
        return this.#tax;
    }
    set tax(value) {
        if (value !== "") {
            value = Number.parseFloat(value);
            if (!value || value <= 0) throw new InvalidValueException("tax");
            this.#tax = value;
        } else if (value === "") {
            this.#tax = value;
        } else throw new InvalidValueException("tax");
    }

    get images2() {
        return this.#images;
    }
    set images2(value) {
        if (value !== "") {
            if (!Array.isArray(value)) throw new InvalidValueException("images");
            this.#images = value;
        } else if (value === "") {
            this.#images = value;
        } else throw new InvalidValueException("images");

    }

    toString() {
        return "SerialNumber: " + this.#serialNumber + " Nombre: " + this.#name + " Precio: " + this.#price +
            " Descripción: " + this.#description + " Tax: " + this.#tax + " Images: " + this.#images + ".";
    }
}
//Una vez creada la clase, creamos los propotipos para que los getter sean enumerables, ya que por defecto no lo son.
Object.defineProperty(Product.prototype, "serialNumber", { enumerable: true });
Object.defineProperty(Product.prototype, "name", { enumerable: true });
Object.defineProperty(Product.prototype, "price", { enumerable: true });
Object.defineProperty(Product.prototype, "description", { enumerable: true });
Object.defineProperty(Product.prototype, "tax", { enumerable: true });
Object.defineProperty(Product.prototype, "images", { enumerable: true, writable: true });

class Television extends Product {
    #display;
    #plataforma;
    #video;
    #audio;
    constructor(serialNumber, name, price, display, plataforma, video, audio, description, tax, images = []) {
        //Comprobación del que al constructor se le ha llamado con la etiqueta new
        if (!new.target) throw new InvalidAccessConstructorException();
        /*Llamada a clase padre (Product) para utilizar sus metodos. Herencia.
            Si hay algun error (pj. price) la clase padre nos salta el error*/
        super(serialNumber, name, price, description, tax, images);

        if (!display) throw new EmptyValueException("display");
        if (!plataforma) throw new EmptyValueException("plataforma");
        if (!video) throw new EmptyValueException("video");
        if (!audio) throw new EmptyValueException("audio");
        this.#display = display;
        this.#plataforma = plataforma;
        this.#video = video;
        this.#audio = audio;
    }

    get display() {
        return this.#display;
    }
    set display(value) {
        if (!value) throw new EmptyValueException("display");
        this.#display = value;
    }

    get plataforma() {
        return this.#plataforma;
    }
    set plataforma(value) {
        if (!value) throw new EmptyValueException("plataforma");
        this.#plataforma = value;
    }

    get video() {
        return this.#video;
    }
    set video(value) {
        if (!value) throw new EmptyValueException("video");
        this.#video = value;
    }

    //Tengo que poner el 2 porque si no al mostrarlo da undefined
    get audio2() {
        return this.#audio;
    }
    set audio2(value) {
        if (!value) throw new EmptyValueException("audio");
        this.#audio = value;
    }

    toString() { //Llamamos a la clase padre para que heredemos el metodo toString y añadadimos los nuevos atributos
        return super.toString() + " Display: " + this.#display + " Plataforma: " + this.#plataforma + " Video: "
            + this.#video + " Audio: " + this.#audio + ".";
    }
}
Object.defineProperty(Television.prototype, "display", { enumerable: true });
Object.defineProperty(Television.prototype, "plataforma", { enumerable: true });
Object.defineProperty(Television.prototype, "video", { enumerable: true });
Object.defineProperty(Television.prototype, "audio", { enumerable: true, writable: true });

class PS5 extends Product {
    #cpu;
    #gpu;
    #memoria;
    #disco;
    constructor(serialNumber, name, price, cpu, gpu, memoria, disco, description = "", tax = "", images = []) {
        if (!new.target) throw new InvalidAccessConstructorException();

        super(serialNumber, name, price, description, tax, images);

        if (!cpu) throw new EmptyValueException("cpu");
        if (!gpu) throw new EmptyValueException("gpu");
        if (!memoria) throw new EmptyValueException("memoria");
        if (!disco) throw new EmptyValueException("disco");
        this.#cpu = cpu;
        this.#gpu = gpu;
        this.#memoria = memoria;
        this.#disco = disco;
    }

    get cpu() {
        return this.#cpu;
    }
    set cpu(value) {
        if (!value) throw new EmptyValueException("cpu");
        this.#cpu = value;
    }
    get gpu() {
        return this.#gpu;
    }
    set gpu(value) {
        if (!value) throw new EmptyValueException("gpu");
        this.#gpu = value;
    }
    get memoria() {
        return this.#memoria;
    }
    set memoria(value) {
        if (!value) throw new EmptyValueException("memoria");
        this.#memoria = value;
    }
    get disco2() {//Al igual que en TV tengo que ponerlo como 2 porque sino da undefined
        return this.#disco;
    }
    set disco2(value) {
        if (!value) throw new EmptyValueException("disco");
        this.#disco = value;
    }

    toString() {
        return super.toString() + " CPU: " + this.#cpu + " GPU: " + this.#gpu + " Memoria: "
            + this.#memoria + " Disco: " + this.#disco + ".";
    }
}
Object.defineProperty(PS5.prototype, "cpu", { enumerable: true });
Object.defineProperty(PS5.prototype, "gpu", { enumerable: true });
Object.defineProperty(PS5.prototype, "memoria", { enumerable: true });
Object.defineProperty(PS5.prototype, "disco", { enumerable: true, writable: true });

class Router extends Product {
    #conexion;
    #puerto;
    #antena;
    #peso;
    constructor(serialNumber, name, price, conexion, puerto, antena, peso, description = "", tax = "", images = []) {
        //Comprobación del que al constructor se le ha llamado con la etiqueta new
        if (!new.target) throw new InvalidAccessConstructorException();

        super(serialNumber, name, price, description, tax, images);

        if (!conexion) throw new EmptyValueException("conexion");
        if (!puerto) throw new EmptyValueException("puerto");
        if (!antena) throw new EmptyValueException("antena");
        if (!peso) throw new EmptyValueException("peso");

        this.#conexion = conexion;
        this.#puerto = puerto;
        this.#antena = antena;
        this.#peso = peso;
    }

    get conexion() {
        return this.#conexion;
    }
    set conexion(value) {
        if (!value) throw new EmptyValueException("conexion");
        this.#conexion = value;
    }
    get puerto() {
        return this.#puerto;
    }
    set puerto(value) {
        if (!value) throw new EmptyValueException("puerto");
        this.#puerto = value;
    }
    get antena() {
        return this.#antena;
    }
    set antena(value) {
        if (!value) throw new EmptyValueException("antena");
        this.#antena = value;
    }
    get peso2() {
        return this.#peso;
    }
    set peso2(value) {
        if (!value) throw new EmptyValueException("peso");
        this.#peso = value;
    }

    toString() {
        return super.toString() + " Conexión: " + this.#conexion + " Puerto: " + this.#puerto + " Antena: "
            + this.#antena + " Peso: " + this.#peso + ".";
    }
}
Object.defineProperty(Router.prototype, "conexion", { enumerable: true });
Object.defineProperty(Router.prototype, "puerto", { enumerable: true });
Object.defineProperty(Router.prototype, "antena", { enumerable: true });
Object.defineProperty(Router.prototype, "peso", { enumerable: true, writable: true });

//Exportamos las clases, para que puedan ser utilizadas fuera de este fichero js.
export { Product, Television, PS5, Router };