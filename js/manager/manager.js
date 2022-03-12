'use strict';
//Importancion de todas las clases que van a ser utilizadas
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
} from '../exceptions.js';
import { Product, Traje, Bota, Pantalon, Calcetin } from '../entities/products.js';
import { Category } from '../entities/category.js';
import { Store } from '../entities/store.js';
import { Coords } from '../entities/coords.js';
let tiendaDef = new Store("18548484A", "La tiendita 2", "C/Toledo, 28, Ciudad Real", 658455141, new Coords(-15555, 555));

let StoreHouse = (function () {
    let instantiated;

    function init() {
        class StoreHouse {
            #name = "Menswear-BQ";
            /*He utilizado un mapa para sea más fácil el manejo, ya que al producto le añado como clave el ProductoX 
                y de valor el array con las diversas categorias*/
            #products = new Map();
            #catDefault = new Category("Defecto", "Productos de Defecto"); //Categoría por defecto
            #categories = []; //Array con las categorías que tenemos en el almacen
            //He creado un mapa, para que como clave se añada la tienda, y como valor los diversos productos en forma de array.
            #shops = new Map();
            //#stock = []; creo que no hace falta utilizarlo
            #shopDefault = new Map(); //Tienda por defecto

            constructor() {
                if (!new.target) throw new InvalidAccessConstructorException();
            }

            get name() {
                return this.#name;
            }
            set name(value) {
                if (!value) throw new EmptyValueException("name");
                this.#name = value;
            }
            get catDefault() {
                return this.#catDefault;
            }
            get shopDefault() {
                //a la tienda por defecto se le añade la tienda creada anteriormente
                this.#shopDefault.set(tiendaDef.cif, []);
                return this.#shopDefault;
            }

            //Devuelve un iterator de los productos del almacen
            get products() {
                let array = this.#products;
                return {
                    *[Symbol.iterator]() {
                        for (let product of array) {
                            yield product;
                        }
                    }
                }
            }

            get categories() {
                return this.#categories[Symbol.iterator]();
            }

            get shops() {
                return this.#shops[Symbol.iterator]();
            }

            addCategory(category) {
                //HE QUITADO EL TITLE
                //Comprobación de que la categoría es de la clase Categoría
                if (!(category instanceof Category)) throw new Error("El objecto introducido no es de tipo Category");
                //Dado un product, devuelve la posición de ese product en el carrito o -1 si no lo encontramos.
                if (this.#categories.indexOf(category) >= 0) throw new Error("La categoria ya está introducida");
                this.#categories.push(category);
                return this.#categories.length;
            }

            removeCategory(category) {
                //Comprobación de que la categoría está añadida en el array de categorías
                if (this.#categories.indexOf(category) === -1) throw new Error("La categoria no está introducida");
                let index = this.#categories.indexOf(category);
                this.#categories.splice(index, 1);
                //Al eliminar la categoría, al producto que tenia dicha categoria le ponemos la de por defecto
                let catDefault = this.#catDefault;
                this.#products.forEach(function (value, key) {
                    index = value.indexOf(category);
                    //Si el producto contiene la categoria, se le añade la de por defecto
                    if (index > -1) value.splice(index, 1), value.push(catDefault);
                });
                return this.#categories.length; //Devolución de del tamaño del array
            }

            addProduct(product, category) {
                if (!(product instanceof Product)) throw new EmptyValueException("producto");
                let arr = new Array();
                //Comprobamos que la categoría sea un array, si no lo fuera se le añade a un array nuevo
                if (!(Array.isArray(category))) { arr.push(category) } else { arr = category };
                //Si el producto no estaba introcido se le añade al mapa
                if (!this.#products.has(product)) {
                    this.#products.set(product, arr);
                } else {
                    //Si el producto ya estaba introducido, pero su nueva categoria no, se le añade.
                    this.#products.forEach(function (value, key) {
                        if (value.indexOf(category) != -1) {
                            value.push(category);
                        }
                    });
                }
                return this.#products.size;
            }

            removeProduct(product) {
                if (!(product instanceof Product)) throw new Error("El objecto introducido no es de tipo Producto");
                ///Comprobación del que producto esté introducido
                if (!this.#products.has(product)) throw new Error("El producto no estaba introducido");
                this.#products.delete(product);
                return this.#products.size;
            }

            addShop(shop) {
                if (!(shop instanceof Store)) throw new Error("El objecto introducido no es de tipo Shop");
                //Comprobación de la tienda no esté añadida ya
                if (this.#shops.has(shop.cif)) throw new Error("La tienda ya está introducida");
                //Añadicion de la tienda y el nuevo mapa para los nuevos productos
                this.#shops.set(shop, new Map());
                return this.#shops.size;
            }

            removeShop(shop) {
                if (!(shop instanceof Store)) throw new Error("El objecto introducido no es de tipo Shop");
                if (!(this.#shops.has(shop.cif))) throw new Error("La tienda no está introducida");
                let shopdef = this.#shopDefault;//Al eliminar la tienda se le añade la tienda de por defecto
                let index;
                this.#shops.forEach(function (value, key) {
                    if (key === shop) {
                        for (let product of value) {
                            //Los productos añadidos a la tienda eliminada, pasan a la tienda por defecto.
                            index = shopdef.indexOf(product);
                            if (index != -1) shopdef.push(product);
                        }
                    }
                });
                this.#shops.delete(shop);
                return this.#shops.size;
            }

            addProductInShop(product, shop, units) {//Añade al producto con x unidades a la tienda
                if (!(this.#products.has(product))) throw new Error("El producto no está introducido en el almacen");
                if (!this.#shops.has(shop)) throw new Error("La tienda no está introducida en el almacen");
                if (units <= 0) throw new InvalidValueException("unidad", units);
                let index;
                this.#shops.forEach(function (value, key) {
                    if(key===shop) value.set(product, units);
                });
                return index; //Retorna las unidades del producto pasado por parametro
            }

            addQuantityProductInShop(product, shop, stock) {//Añade las unidades al producto de la tienda
                if (!(this.#products.has(product))) throw new Error("El producto no existe");
                if (!this.#shops.has(shop)) throw new Error("La tienda no existe");
                if (stock <= 1) throw new InvalidValueException("stock", stock);
                let index;
                this.#shops.forEach(function (value, key) {
                    value.forEach(function (unit, prod) {
                        //Si tuviera ya unidades se le suma las nuevas unidades en stock, y se le añaden al producto
                        if (prod === product) unit += stock, index = unit, value.set(prod, unit);
                    });
                });
                return index;
            }

            getCategoryProducts(category) {//Productos que comparten la misma categoría
                let position = this.#categories.findIndex(x => x.title === category.title);
                if (position === -1) throw new Error("La categoria no existe en el almacen");
                let arrProd = new Array();
                this.#products.forEach(function (value, key) {
                    //Si la categoría está en el producto, se añade el producto al array
                    if (value.indexOf(category) >= 0) arrProd.push(key);
                })
                return arrProd[Symbol.iterator]();
            }

            getShopProducts(shop, type) {//tipo de productos que comparten la misma tienda
                if (!(this.#shops.has(shop))) throw new Error("La tienda no existe en el almacen");
                let arr = new Array();
                if (!(type instanceof Object)) throw new Error("El type introducido no es un Objecto");
                this.#shops.forEach(function (value, key) {
                    value.forEach(function (unit, prod) {
                        /*Si el producto de la tienda x es de tipo al que se ha pasado por parametro,
                             se le añade al mapa con sus unidades en stock*/
                        if (prod instanceof type) arr.push(prod)
                    });
                })
                return mapa[Symbol.iterator]();
            }

            getCategory(title) {
                let position = this.#categories.findIndex(x => x.title === title);
                if (position === -1)
                    throw new Error("hola");
                return this.#categories[position];
            }

            getProduct(id) {
                let arr = [];
                let product;
                this.#products.forEach(function (value, key) {
                    arr.push(key);
                });

                for (let object of arr) {
                    if(object.serialNumber === id) product = object;
                }
                return product;
            }

            getShops(){
                let shops = [];
                this.#shops.forEach(function (value, key) {
                    shops.push(key);
                });
                return shops;
            }

            getProductinShops(shop){
                let arr = new Array();
                this.#shops.forEach(function (value, key) {
                    if(key.name === shop){
                        value.forEach(function (stock, product) {
                            arr.push(product);
                        })
                    }
                })
                return arr[Symbol.iterator]();
            }

            getTypeProduct(type){
                let arr = [];
                this.#products.forEach(function (value, key) {
                    if(key.constructor.name === type) arr.push(key);;
                });
                return arr;
            }
        }
        Object.defineProperty(StoreHouse.prototype, "products", { enumerable: true });
        Object.defineProperty(StoreHouse.prototype, "categories", { enumerable: true });
        Object.defineProperty(StoreHouse.prototype, "shops", { enumerable: true });
        Object.defineProperty(StoreHouse.prototype, "catDefault", { enumerable: true });
        Object.defineProperty(StoreHouse.prototype, "shopDefault", { enumerable: true });
        let sth = new StoreHouse();//Devolvemos el objeto StoreHouse para que sea una instancia única.
        Object.freeze(sth);
        return sth;
    }
    return {
        //Devuelve un objeto con el método getInstance
        getInstance: function () {
            if (!instantiated) { //Si la variable instantiated es undefined, ejecuta la función init.
                instantiated = init(); //instantiated contiene la función
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();

export { StoreHouse };