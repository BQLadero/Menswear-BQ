import { Product, Traje, Bota, Pantalon, Calcetin } from '../entities/products.js';
import { Category } from '../entities/category.js';
import { Store } from '../entities/store.js';
import { Coords } from '../entities/coords.js';
import { StoreHouse } from './manager.js';
let categories;
let traje;
let bota;
let pantalon;
let calcetin;
let shops;

$.ajax({
    url: "./cargaDatos.json",
    method: 'GET',
    async: false,
}).done((data) => {
    categories = data.category;
    categories.forEach(elem => {
        let tmp = new Category(elem.title, elem.description);
        StoreHouse.addCategory(tmp);
    });

    shops = data.shops;
    shops.forEach(elem => {
        let tmp = new Store(elem.cif, elem.name, elem.address, elem.phone, new Coords(elem.latitude, elem.longitude));
        StoreHouse.addShop(tmp);
    });

    traje = data.products.trajes;
    traje.forEach(elem => {
        let tmp = new Traje(elem.serialNumber, elem.name, elem.description, elem.price, elem.altura, elem.cierre, elem.cuidados,
                    elem.detalles, elem.tax, elem.images);
        for (let cat of StoreHouse.categories) {
            if (cat.category.title === "Pull & Bear") {
                StoreHouse.addProduct(tmp, cat.category)
                StoreHouse.addProductInShop(tmp, shops[2], 5)
            }
        }
    })

    bota = data.products.botas;
    bota.forEach(elem => {
        let tmp = new Bota(elem.serialNumber, elem.name, elem.description, elem.price, elem.talla, elem.cierre, elem.suela,
            elem.plantilla, elem.tax, elem.images);
        for (let cat of StoreHouse.categories) {
            if (cat.category.title === "Zara") {
                StoreHouse.addProduct(tmp, cat.category)
                StoreHouse.addProductInShop(tmp, shops[0], 5)
            }
        }
    })

    pantalon = data.products.pantalones;
    pantalon.forEach(elem => {
        let tmp = new Pantalon(elem.serialNumber, elem.name, elem.description, elem.price, elem.cintura, elem.cierre, elem.bolsillos,
            elem.material, elem.tax, elem.images);
        for (let cat of StoreHouse.categories) {
            if (cat.category.title === "C&A") {
                StoreHouse.addProduct(tmp, cat.category)
                StoreHouse.addProductInShop(tmp, shops[1], 5)
            }
        }
    })

    calcetin = data.products.calcetines;
    calcetin.forEach(elem => {
        let tmp = new Calcetin(elem.serialNumber, elem.name, elem.description, elem.price, elem.diseño, elem.tipo, elem.material,
            elem.pack, elem.tax, elem.images);
        for (let cat of StoreHouse.categories) {
            if (cat.category.title === "Zalando") {
                StoreHouse.addProduct(tmp, cat.category)
                StoreHouse.addProductInShop(tmp, shops[2], 5)
            }
        }
    })

}).fail(function (res) {
    console.log(res)
});