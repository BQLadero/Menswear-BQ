'use strict';
//Importación de clases de las diversas excepciones que vamos a utilizar
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
} from '../shoppingCart/exceptions.js';

class Product {
    //Creación de los atributos
    #serialNumber;
    #name;
    #price;
    #description;
    #tax;
    #images;
    constructor(serialNumber, name, price, description, tax = 0.1, images) {
        //Comprobación del que al constructor se le ha llamado con la etiqueta new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Posibles errores en los valores del constructor
        if (serialNumber < 0) throw new EmptyValueException("serialNumber");
        if (!name) throw new EmptyValueException("name");
        price = Number.parseFloat(price);
        if (!price || price <= 0) throw new InvalidValueException("price");

        //Al ser opcionales, pueden estar vacio, pero si se pasar algun dato hay que comprobarlo
        /*if (tax !== "") {
            tax = Number.parseFloat(tax);
            if (!tax || tax <= 0) throw new InvalidValueException("tax");
            this.#tax = tax;
        } else if (tax === "") {
            this.#tax = tax;
        } else throw new InvalidValueException("tax");*/

        /*if (images !== "") {
            if (!Array.isArray(images)) throw new InvalidValueException("images");
            this.#images = images;
        } else if (images === "") {
            this.#images = images;
        } else throw new InvalidValueException("images");*/

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
        /*if (value !== "") {
            if (!Array.isArray(value)) throw new InvalidValueException("images");
            this.#images = value;
        } else if (value === "") {
        } else throw new InvalidValueException("images");*/
        this.#images = value;

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

class Traje extends Product {
    #altura;
    #cierre;
    #cuidados;
    #detalles;
    constructor(serialNumber, name, price, altura, cierre, cuidados, detalles, description = "", tax = 0, images) {
        //Comprobación del que al constructor se le ha llamado con la etiqueta new
        if (!new.target) throw new InvalidAccessConstructorException();
        /*Llamada a clase padre (Product) para utilizar sus metodos. Herencia.
            Si hay algun error (pj. price) la clase padre nos salta el error*/
        super(serialNumber, name, price, description, tax, images);

        if (!altura || altura < 0) throw new InvalidValueException("altura");
        if (!cierre) throw new EmptyValueException("cierre");
        if (!cuidados) throw new EmptyValueException("cuidados");
        if (!detalles) throw new InvalidValueException("detalles");
        this.#altura = altura;
        this.#cierre = cierre;
        this.#cuidados = cuidados;
        this.#detalles = detalles;
    }

    get altura() {
        return this.#altura;
    }
    set altura(value) {
        if (!!value || value < 0) throw new InvalidValueException("altura");
        this.#altura = value;
    }

    get cierre() {
        return this.#cierre;
    }
    set cierre(value) {
        if (!value) throw new EmptyValueException("cierre");
        this.#cierre = value;
    }

    get cuidados() {
        return this.#cuidados;
    }
    set cuidados(value) {
        if (!value) throw new EmptyValueException("cuidados");
        this.#cuidados = value;
    }

    //Tengo que poner el 2 porque si no al mostrarlo da undefined
    get detalles() {
        return this.#detalles;
    }
    set detalles(value) {
        if (!value) throw new EmptyValueException("detalles");
        this.#detalles = value;
    }

    toString() { //Llamamos a la clase padre para que heredemos el metodo toString y añadadimos los nuevos atributos
        return super.toString() + " Altura: " + this.#altura + " Cierre: " + this.#cierre + " Cuidados: "
            + this.#cuidados + " Detalles: " + this.#detalles + ".";
    }
}
Object.defineProperty(Traje.prototype, "altura", { enumerable: true });
Object.defineProperty(Traje.prototype, "cierre", { enumerable: true });
Object.defineProperty(Traje.prototype, "cuidados", { enumerable: true });
Object.defineProperty(Traje.prototype, "medidas", { enumerable: true, writable: true });

class Bota extends Product {
    #talla;
    #cierre;
    #suela;
    #plantilla;
    constructor(serialNumber, name, price, talla, cierre, suela, plantilla, description = "", tax = "", images = []) {
        if (!new.target) throw new InvalidAccessConstructorException();

        super(serialNumber, name, price, description, tax, images);

        if (!talla || talla < 0) throw new EmptyValueException("talla");
        if (!cierre) throw new EmptyValueException("cierre");
        if (!suela) throw new EmptyValueException("suela");
        if (!plantilla) throw new EmptyValueException("plantilla");
        this.#talla = talla;
        this.#cierre = cierre;
        this.#suela = suela;
        this.#plantilla = plantilla;
    }

    get talla() {
        return this.#talla;
    }
    set talla(value) {
        if (!value || value < 0) throw new EmptyValueException("talla");
        this.#talla = value;
    }
    get cierre() {
        return this.#cierre;
    }
    set cierre(value) {
        if (!value) throw new EmptyValueException("cierre");
        this.#cierre = value;
    }
    get suela() {
        return this.#suela;
    }
    set suela(value) {
        if (!suela) throw new EmptyValueException("suela");
        this.#suela = value;
    }
    get plantilla() {//Al igual que en TV tengo que ponerlo como 2 porque sino da undefined
        return this.#plantilla;
    }
    set plantilla(value) {
        if (!value) throw new EmptyValueException("plantilla");
        this.#plantilla = value;
    }

    toString() {
        return super.toString() + " Talla: " + this.#talla + " Cierre: " + this.#cierre + "Suela: "
            + this.#suela + " Plantilla: " + this.#plantilla + ".";
    }
}
Object.defineProperty(Bota.prototype, "talla", { enumerable: true });
Object.defineProperty(Bota.prototype, "cierre", { enumerable: true });
Object.defineProperty(Bota.prototype, "suela", { enumerable: true });
Object.defineProperty(Bota.prototype, "plantilla", { enumerable: true, writable: true });

class Pantalon extends Product {
    #cintura;
    #cierre;
    #bolsillos;
    #material;
    constructor(serialNumber, name, price, cintura, cierre, bolsillos, material, description = "", tax = "", images = []) {
        //Comprobación del que al constructor se le ha llamado con la etiqueta new
        if (!new.target) throw new InvalidAccessConstructorException();

        super(serialNumber, name, price, description, tax, images);

        if (!cintura) throw new EmptyValueException("cintura");
        if (!cierre) throw new EmptyValueException("cierre");
        if (!bolsillos) throw new EmptyValueException("bolsillos");
        if (!material) throw new EmptyValueException("material");

        this.#cintura = cintura;
        this.#cierre = cierre;
        this.#bolsillos = bolsillos;
        this.#material = material;
    }

    get cintura() {
        return this.#cintura;
    }
    set cintura(value) {
        if (!value) throw new EmptyValueException("cintura");
        this.#cintura = value;
    }
    get cierre() {
        return this.#cierre;
    }
    set cierre(value) {
        if (!value) throw new EmptyValueException("cierre");
        this.#cierre = value;
    }
    get bolsillos() {
        return this.#bolsillos;
    }
    set bolsillos(value) {
        if (!value) throw new EmptyValueException("bolsillos");
        this.#bolsillos = value;
    }
    get material() {
        return this.#material;
    }
    set material(value) {
        if (!value) throw new EmptyValueException("material");
        this.#material = value;
    }

    toString() {
        return super.toString() + " Cintura: " + this.#cintura + " Cierre: " + this.#cierre + " Bolsillos: "
            + this.#bolsillos + " Material: " + this.#material + ".";
    }
}
Object.defineProperty(Pantalon.prototype, "cintura", { enumerable: true });
Object.defineProperty(Pantalon.prototype, "cierre", { enumerable: true });
Object.defineProperty(Pantalon.prototype, "bolsillos", { enumerable: true });
Object.defineProperty(Pantalon.prototype, "material", { enumerable: true, writable: true });

class Calcetin extends Product {
    #diseño;
    #tipo; //Pinkies, tobilleros, etc.
    #material;
    #pack;
    constructor(serialNumber, name, price, diseño, tipo, material, pack, description = "", tax = "", images = []) {
        //Comprobación del que al constructor se le ha llamado con la etiqueta new
        if (!new.target) throw new InvalidAccessConstructorException();

        super(serialNumber, name, price, description, tax, images);

        if (!diseño) throw new EmptyValueException("diseño");
        if (!tipo) throw new EmptyValueException("tipo");
        if (!material) throw new EmptyValueException("material");
        if (!pack) throw new EmptyValueException("pack");

        this.#diseño = diseño;
        this.#tipo = tipo;
        this.#material = material;
        this.#pack = pack;
    }

    get diseño() {
        return this.#diseño;
    }
    set diseño(value) {
        if (!value) throw new EmptyValueException("diseño");
        this.#diseño = value;
    }
    get tipo() {
        return this.#tipo;
    }
    set tipo(value) {
        if (!value) throw new EmptyValueException("tipo");
        this.#tipo = value;
    }
    get material() {
        return this.#material;
    }
    set material(value) {
        if (!value) throw new EmptyValueException("material");
        this.#material = value;
    }
    get pack() {
        return this.#pack;
    }
    set pack(value) {
        if (!value) throw new EmptyValueException("pack");
        this.#pack = value;
    }

    toString() {
        return super.toString() + " Diseño: " + this.#diseño + " Tipo: " + this.#tipo + " Material: " + 
                this.#material + " Pack: "+ this.#pack + ".";
    }
}
Object.defineProperty(Calcetin.prototype, "diseño", { enumerable: true });
Object.defineProperty(Calcetin.prototype, "tipo", { enumerable: true });
Object.defineProperty(Calcetin.prototype, "material", { enumerable: true, writable: true });
Object.defineProperty(Calcetin.prototype, "pack", { enumerable: true });

//Exportamos las clases, para que puedan ser utilizadas fuera de este fichero js.
export { Product, Traje, Bota, Pantalon, Calcetin };