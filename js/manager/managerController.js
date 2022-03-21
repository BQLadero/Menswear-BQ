'use strict';
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
} from '../exceptions.js';
import { Product, Traje, Bota, Pantalon, Calcetin } from '../entities/products.js';
import { Category } from '../entities/category.js';
import { Store } from '../entities/store.js';
import { Coords } from '../entities/coords.js';
import { StoreHouse } from './manager.js';
import { User } from '../entities/user.js';
//import {categoryParsed, shopParsed, productParsed} from './ejemplo.js';
//import { categories } from './ejemplo.js';

class ManagerController {
    #storeHouse;
    #storeHouseView;
    #auth;
    #user;

    #loadManagerObjects() { //Creacion de las categorias, productos y tiendas
        let storeHouse = this.#storeHouse;
        /*CATEGORIAS*/
        let category1 = new Category('Pull & Bear', 'Categoria de Pull & Bear'); storeHouse.addCategory(category1);
        let category2 = new Category('Zara', 'Categoria de Zara'); storeHouse.addCategory(category2);
        let category3 = new Category('H&M', 'Categoria de H&M'); storeHouse.addCategory(category3);
        let category4 = new Category('C&A', 'Categoria de C&A'); storeHouse.addCategory(category4);
        let category5 = new Category('Zalando', 'Categoria de Zalando'); storeHouse.addCategory(category5);

        /*TIENDAS*/
        let coordSt = new Coords(38.989201349615364, -3.9282941974235253);
        let store1 = new Store("185788484A", "Menswear-BQ CR", "C/Toledo, 28, Ciudad Real", 926714487, coordSt);
        storeHouse.addShop(store1);
        let coordsSt2 = new Coords(39.862215, -4.008410);
        let store2 = new Store("185788228A", "Menswear-BQ TO", "Pº de la Rosa, 3V, Toledo", 926145723, coordsSt2);
        storeHouse.addShop(store2);
        let coordsSt3 = new Coords(39.392154, -3.207000);
        let store3 = new Store("185781244A", "Menswear-BQ ASJ", "C/Tribaldos, 20, Alcázar de San Juan", 925748871, coordsSt3);
        storeHouse.addShop(store3);

        /*TRAJES*/
        let product1 = new Traje(1, 'JPRFanco Suit', 74.99, 188, 'Botón', 'Lavar en seco', 'Hombrera', "Traje de gala", 5, ['./img/traje-zalando-1.png', './img/traje-zalando-1-2.png', './img/traje-zalando-1-3.png']);
        storeHouse.addProduct(product1, [category5, category1]);
        storeHouse.addProductInShop(product1, store1, 7);
        storeHouse.addProductInShop(product1, store2, 7);

        let product2 = new Traje(2, 'Tropical Active', 159.99, 189, 'Botón', 'Lavar en seco', 'no', "Traje de gala", 5, ['./img/traje-zalando-2.png', './img/traje-zalando-2-1.png', './img/traje-zalando-2-2.png']);
        storeHouse.addProduct(product2, [category5, category3]);
        storeHouse.addProductInShop(product2, store1, 2);

        let product3 = new Traje(3, 'Plain mens suit', 149.95, 192, 'Botón', 'Lavar en seco', 'Tira de botones, hombrera', "Traje de gala", 5, ['./img/traje-zalando-3.png', './img/traje-zalando-3-1.png', './img/traje-zalando-3-2.png']);
        storeHouse.addProduct(product3, category5);
        storeHouse.addProductInShop(product3, store2, 3);
        storeHouse.addProductInShop(product3, store3, 3);

        let product4 = new Traje(4, 'Blazer Conjunto Relaxed', 79.95, 188, 'Botón', 'No usar secadora', 'Bolsillo interior', "Traje de gala", 5, ['./img/traje-zara-1.png', './img/traje-zara-1-1.png', './img/traje-zara-1-2.png']);
        storeHouse.addProduct(product4, [category2, category4]);
        storeHouse.addProductInShop(product4, store3, 1);

        let product5 = new Traje(5, 'Regular Fit', 117.99, 175, 'Botón y Cremallera', 'Lavar en ciclo de lavado suave a 40°', 'no', "Traje de gala", 5, ['./img/traje-c&a-2.png', './img/traje-c&a.png']);
        storeHouse.addProduct(product5, category4);
        storeHouse.addProductInShop(product5, store2, 4);

        /*BOTAS*/
        let product6 = new Bota(6, 'Bota acordonada piso Track', 39.99, 39, 'Cordones y Cremallera', 'Track', 'Termica', "Zapato tipo bota acordonada disponible en varios colores"
            , 0, ['./img/botas-p&b-1.png', './img/botas-p&b-1-1.png']);
        storeHouse.addProduct(product6, category1);
        storeHouse.addProductInShop(product6, store1, 7);

        let product7 = new Bota(7, 'Bota acordonada suela track', 25.99, 44, 'Cordones', 'Track', 'Bioeco', "Zapato tipo bota acordonada disponible en varios colores"
            , 0, ['./img/botas-p&b-2.png', './img/botas-p&b-2-1.png']);
        storeHouse.addProduct(product7, category1);
        storeHouse.addProductInShop(product7, store2, 4);
        storeHouse.addProductInShop(product7, store3, 3);

        let product8 = new Bota(8, 'Bota cordones', 39.95, 41, 'Cordones', 'Volumen', 'Poliuretano', "Bota de cordones. Disponible en color burdeos y en marrón."
            , 0, ['./img/botas-zara-1.png', './img/botas-zara-1-1.png']);
        storeHouse.addProduct(product8, category2);
        storeHouse.addProductInShop(product8, store2, 2);

        let product9 = new Bota(9, 'Bota cordones engomada', 49.95, 40, 'Cordones', 'Track', 'Poliéster', "Bota con cordones. Corte liso con acabado engomado."
            , 0, ['./img/botas-zara-2.png', './img/botas-zara-2-1.png', './img/botas-zara-2-2.png']);
        storeHouse.addProduct(product9, category2);
        storeHouse.addProductInShop(product9, store1, 8);

        let product10 = new Bota(10, 'Botas Chelsea', 39.99, 43, 'No contiene cierre', 'Goma termoplástica', 'Algodón ', "Botas Chelsea en ante sintético con elásticos laterales y trabilla detrás. Tacón 3 cm."
            , 0, ['./img/botas-h&m.png', './img/botas-h&m-2.png']);
        storeHouse.addProduct(product10, category3);
        storeHouse.addProductInShop(product10, store1, 17);
        storeHouse.addProductInShop(product10, store2, 5);

        /*PANTALONES*/
        let product11 = new Pantalon(11, 'Joggers cargo Skinny Fit', 23.99, "Elástica", 'Cordones', 'Al bies y bolsillos traseros ', 'Algodón ', "Joggers en sarga de algodón con cintura elástica y cordón de ajuste"
            , 0, ['./img/pantalones-h&m-1.png', './img/pantalones-h&m-1-1.png']);
        storeHouse.addProduct(product11, [category3, category2]);
        storeHouse.addProductInShop(product11, store1, 7);
        storeHouse.addProductInShop(product11, store3, 4);
        storeHouse.addProductInShop(product11, store2, 3);

        let product12 = new Pantalon(12, 'Joggers cargo', 27.99, 'Elástica', 'Cordones', 'Al bies y bolsillos traseros', "Algodón", "Joggers de algodón con elástico revestido y cordón de ajuste en la cintura",
            0, ['./img/pantalones-h&m-2.png', './img/pantalones-h&m-2-1.png', './img/pantalones-h&m-2-2.png']);
        storeHouse.addProduct(product12, category3);
        storeHouse.addProductInShop(product12, store3, 7);
        storeHouse.addProductInShop(product12, store2, 7);

        let product13 = new Pantalon(13, 'Chinos slim fit', 49.99, 'Elástica', 'Botón', 'Al bies por delante y un bolsillo pequeño, dos bolsillos ribeteados por detrás.', "Algodón y Elastano",
            "Chinos ceñidos de tejido elástico. Con dos bolsillos al bies por delante y un bolsillo pequeño, dos bolsillos ribeteados por detrás.", 0,
            ['./img/pantalones-c&a-1.png', './img/pantalones-c&a-1-1.png']);
        storeHouse.addProduct(product13, category4);
        storeHouse.addProductInShop(product13, store1, 4);
        storeHouse.addProductInShop(product13, store3, 5);

        let product14 = new Pantalon(14, 'Pantalón de deporte - fitness', 24.99, 'Elástica', 'Cordones', 'Dos bolsillos con cremalleras a los lados', "Poliéster y Algodón",
            "Pantalón de deporte de felpa lisa. Dos bolsillos con cremalleras a los lados y pespuntes estilo biker de adorno delante. Puños de canalé en los bajos.", 0,
            ['./img/pantalones-c&a-2.png', './img/pantalones-c&a-2-1.png']);
        storeHouse.addProduct(product14, category4);
        storeHouse.addProduct(product14, category5);
        storeHouse.addProductInShop(product14, store1, 2);
        storeHouse.addProductInShop(product14, store1, 11);
        storeHouse.addProductInShop(product14, store3, 14);

        let product15 = new Pantalon(15, 'Pantalón Confort Pliegue', 29.95, 'Elástica y confortable', 'Botón y Cremallera', 'En delantero y detalle de bolsillos de vivo en espalda', "Poliéster, viscosa y elastano",
            "Pantalón confeccionado en tejido de estructura elástica y confortable. Detalle de pliegues frontales en cintura.", 0,
            ['./img/pantalones-zara.png', './img/pantalones-zara-1.png', './img/pantalones-zara-2.png']);
        storeHouse.addProduct(product15, category2);
        storeHouse.addProductInShop(product15, store2, 1);

        /*CALCETINES*/
        let product16 = new Calcetin(16, 'Heatgear Locut', 7.95, "Deporte", 'Tobileros', 'Punto', 3, "Calcetines de deporte", 0, ['./img/calcetines-zalando.png', './img/calcetines-zalando-2.png']);
        storeHouse.addProduct(product16, category5);
        storeHouse.addProductInShop(product16, store1, 3);
        storeHouse.addProductInShop(product16, store3, 2);

        let product17 = new Calcetin(17, 'Calcetines', 3.99, "Jacquard", 'Largos', 'Algodón, Poliamida y Elastano', 1, "Calcetines de bob Esponja", 0, ['./img/calcetines-c&a.png', './img/calcetines-c&a-1.png']);
        storeHouse.addProduct(product17, category4);
        storeHouse.addProduct(product17, category5);
        storeHouse.addProductInShop(product17, store2, 4);
        storeHouse.addProductInShop(product17, store3, 50);

        let product18 = new Calcetin(18, 'Pack de 10 calcetines', 14.39, "Tela", 'Medianos', 'Algodón, Poliamida y Elastano', 10, "Calcetines de Tela", 0, ['./img/caltines-h&m.png', './img/caltines-h&m-1.png']);
        storeHouse.addProduct(product18, category3);
        storeHouse.addProductInShop(product18, store1, 12);

        let product19 = new Calcetin(19, 'Calcetines Jacquard The Beathles', 12.95, "THE BEATLES", 'Largos', 'Algodón, Poliamida y Elastano', 2, "Pack de calcetines con jacquard The Beatles. Acabados en rib.",
            0, ['./img/calcetines-zara-1.png', './img/calcetines-zara.png', , './img/calcetines-zara-2.png']);
        storeHouse.addProduct(product19, [category1, category2]);
        storeHouse.addProductInShop(product19, store2, 10);

        let product20 = new Calcetin(20, 'Calcetines Altos', 7.99, "Tela", 'Largos', 'Algodón, Poliamida y Elastano', 3, "JOIN LIFE Care for fiber & Care for water: At least 75% of Ecologically Grown Cotton.",
            0, ['./img/calcetines-p&b.png', './img/calcetines-p&b-1.png']);
        storeHouse.addProduct(product20, category1);
        storeHouse.addProductInShop(product20, store1, 70);
    }

    #cargaDatos() {
        let categories;
        let traje;
        let bota;
        let pantalon;
        let calcetin;
        let shop;

        $.ajax({
            url: "./js/manager/objects.json",
            method: 'GET',
            async: false,
        }).done((data) => {
            categories = data.category;
            categories.forEach(elem => {
                let tmp = new Category(elem.title, elem.description);
                this.#storeHouse.addCategory(tmp);
            });

            shop = data.shops;
            shop.forEach(elem => {
                let tmp = new Store(elem.cif, elem.name, elem.address, elem.phone, new Coords(elem.coords.latitude, elem.coords.longitude));
                this.#storeHouse.addShop(tmp);
            });

            traje = data.products.trajes;
            traje.forEach(elem => {
                let tmp = new Traje(elem.serialNumber, elem.name, elem.price, elem.altura, elem.cierre, elem.cuidados, elem.description,
                    elem.detalles, elem.tax, elem.images);
                let category1 = new Category('Pull & Bear', 'Categoria de Pull & Bear');
                let category2 = new Category('Zara', 'Categoria de Zara');
                this.#storeHouse.addProduct(tmp, [category1, category2]);
                this.#storeHouse.addProductInShop(tmp, data.shops[2], 5);
            })

            bota = data.products.botas;
            bota.forEach(elem => {
                let tmp = new Bota(elem.serialNumber, elem.name, elem.price, elem.talla, elem.cierre, elem.suela, elem.description,
                    elem.plantilla, elem.tax, elem.images);
                for (let cat of this.#storeHouse.categories) {
                    if (cat.title === "Zara") {
                        this.#storeHouse.addProduct(tmp, cat.category)
                        this.#storeHouse.addProductInShop(tmp, data.shops[0], 5)
                    }
                }
            })

            pantalon = data.products.pantalones;
            pantalon.forEach(elem => {
                let tmp = new Pantalon(elem.serialNumber, elem.name, elem.price, elem.cintura, elem.cierre, elem.bolsillos, elem.description,
                    elem.material, elem.tax, elem.images);
                for (let cat of this.#storeHouse.categories) {
                    if (cat.title === "C&A") {
                        this.#storeHouse.addProduct(tmp, cat.category)
                        this.#storeHouse.addProductInShop(tmp, data.shops[1], 5)
                    }
                }
            })

            calcetin = data.products.calcetines;
            calcetin.forEach(elem => {
                let tmp = new Calcetin(elem.serialNumber, elem.name, elem.price, elem.diseño, elem.tipo, elem.material, elem.description,
                    elem.pack, elem.tax, elem.images);
                for (let cat of this.#storeHouse.categories) {
                    if (cat.title === "Zalando") {
                        this.#storeHouse.addProduct(tmp, cat.category)
                        this.#storeHouse.addProductInShop(tmp, data.shops[2], 5)
                    }
                }
            })

        });
    }

    constructor(model, view, auth) {
        this.#storeHouse = model;
        this.#storeHouseView = view;
        this.#auth = auth;
        this.#user = null;

        this.onLoad();
        this.onInit();
        this.#storeHouseView.bindInit(this.handleInit);
        this.#storeHouseView.closeWindows();
    }

    onLoad = () => {
        //this.#cargaDatos();
        this.#loadManagerObjects(); //Llamada a la funcion de creación de objectos
        this.onAddCategory();
        this.onAddShop();
        this.handleChangeBackgroundColor();
        this.handleLocationStores();
        this.handleShowBackup();
        this.#storeHouseView.bindFavs(this.handleFav);
        this.#storeHouseView.bindshowFavs(this.handleShowFavs);


        let userCookie = getCookie('userAdmin');
        if (userCookie) {
            let user = this.#auth.getUser(userCookie);
            if (user) {
                this.#user = this.#auth.getUser(userCookie);
                this.onOpenSession();
            }
        } else {
            this.onCloseSession();
        }
    }

    onInit = () => {
        this.#storeHouseView.showShops(this.#storeHouse.getShops());
        this.#storeHouseView.bindTypeProductsListInMenu(
            this.handleTypeProductsList
        );
        this.#storeHouseView.bindShopProductsList(
            this.handleShopProductsList
        );
    }

    onAddShop = () => { //Añadición de las categorias creadas al menú
        this.#storeHouseView.showShopsInMenu(this.#storeHouse.getShops());
        this.#storeHouseView.showShops(this.#storeHouse.getShops());
    }

    onAddCategory = () => { //Añadición de las categorias creadas al menú
        this.#storeHouseView.showCategoriesInMenu(this.#storeHouse.categories);
        this.#storeHouseView.bindProductsCategoryListInMenu(
            this.handleProductsCategoryList
        );
    }

    handleInit = () => {
        this.onInit();
    }

    handleProductsCategoryList = (title) => {
        let category = this.#storeHouse.getCategory(title);
        let products = this.#storeHouse.getCategoryProducts(category);
        this.#storeHouseView.listCategoriesProducts(products, category.title);
        this.#storeHouseView.bindshowProductInNewWindow();
    }

    handleShopProductsList = (shop) => {
        this.#storeHouseView.listShopProducts((this.#storeHouse.getProductinShops(shop)), shop);
        this.#storeHouseView.bindshowProductInNewWindow();
        this.#storeHouseView.showNewShopForm();
        //this.#storeHouseView.showFavs();
    }

    handleTypeProductsList = (type) => {
        this.#storeHouseView.listTypeProducts(this.#storeHouse.getTypeProduct(type), type);
        this.#storeHouseView.bindshowProductInNewWindow(this.handleShowProduct);
    }

    handleShowProduct = (serial) => {
        try {
            let product = this.#storeHouse.getProduct(storeHouseView);
            this.#storeHouseView.bindshowProductInNewWindow(product);
        } catch (error) {
            this.#storeHouseView.showProduct(null, 'No existe este producto en la página.');
        }
    }

    /*Administración*/

    handleNewShopForm = () => {
        this.#storeHouseView.showNewShopForm();
        this.#storeHouseView.bindNewShopForm(this.handleCreateShop);
    }

    handleCreateShop = (nif, name, address, phone, coords) => {
        let coordsArray = coords.split(',');
        //let store = new Coords(coords[0], coords[1]))
        let shop = new Store(nif, name, address, phone, new Coords(coordsArray[0], coordsArray[1]));

        let done, error;
        try {
            this.#storeHouse.addShop(shop);
            done = true;
            this.onAddShop();
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#storeHouseView.showNewShopModal(done, shop, error);
    }

    handleRemoveShopForm = () => {
        this.#storeHouseView.showRemoveShopForm(this.#storeHouse.getShops());
        this.#storeHouseView.bindRemoveShopForm(this.handleRemoveShop);
    }

    handleRemoveShop = (name, position) => {
        let done, error, shop;
        try {
            let shops = this.#storeHouse.getShops();
            shop = this.#storeHouse.getExistShop(name, shops);
            this.#storeHouse.removeShop(shop);
            done = true;
            this.onAddShop();
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#storeHouseView.showRemoveShopModal(done, shop, position, error);
    }

    handleNewCategoryForm = () => {
        this.#storeHouseView.showNewCategoryForm();
        this.#storeHouseView.bindNewCategoryForm(this.handleCreateCategory);
    }

    handleCreateCategory = (title, desc) => {
        let cat = new Category(title);
        cat.description = desc;

        let done, error;
        try {
            this.#storeHouse.addCategory(cat);
            done = true;
            this.onAddCategory();
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#storeHouseView.showNewCategoryModal(done, cat, error);
    }

    handleRemoveCategoryForm = () => {
        this.#storeHouseView.showRemoveCategoryForm(this.#storeHouse.categories);
        this.#storeHouseView.bindRemoveCategoryForm(this.handleRemoveCategory);
    }

    handleRemoveCategory = (title, position) => {
        let done, error, cat;
        try {
            cat = this.#storeHouse.getCategory(title);
            this.#storeHouse.removeCategory(cat);
            done = true;
            this.onAddCategory();
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#storeHouseView.showRemoveCategoryModal(done, cat, position, error);
    }

    handleNewProductForm = () => {
        this.#storeHouseView.showNewProductForm(this.#storeHouse.categories);
        this.#storeHouseView.bindNewProductForm(this.handleCreateProduct);
    }

    handleCreateProduct = (id, name, price, taxProduct, espeProd1, espeProd2, espeProd3, espeProd4, des, image, categories, type) => {
        let product;
        switch (type) {
            case "traje":
                product = new Traje(id, name, price, espeProd1, espeProd2, espeProd3, espeProd4, des, taxProduct, [image]);
                break;
            case "bota":
                product = new Bota(id, name, price, espeProd1, espeProd2, espeProd3, espeProd4, des, taxProduct, [image]);
                break;
            case "pantalon":
                product = new Pantalon(id, name, price, espeProd1, espeProd2, espeProd3, espeProd4, des, taxProduct, [image]);
                break;
            case "calcetin":
                product = new Traje(id, name, price, espeProd1, espeProd2, espeProd3, espeProd4, des, taxProduct, [image]);
                break;
        }

        let done, error;
        try {
            let categorias = new Array();
            for (let i = 0; i < categories.length; i++) {
                let categoria = this.#storeHouse.getCategory(categories[i]);
                categorias.push(categoria);
            }
            this.#storeHouse.addProduct(product, categorias);
            this.onAddCategory();
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#storeHouseView.showNewProductModal(done, product, error);
    }

    handleRemoveProductForm = () => {
        this.#storeHouseView.showRemoveProductForm();
        this.#storeHouseView.bindSelectTypeForm(this.handleRemoveTypeProduct);
    }

    handleRemoveTypeProduct = (type) => {
        this.#storeHouseView.showRemoveTypeProductForm(this.#storeHouse.getTypeProduct(type));
        this.#storeHouseView.bindRemoveProductTypeForm(this.handleRemoveproduct);
    }

    handleRemoveproduct = (products) => {
        let done, error, position;
        let productsDel = new Array();
        try {
            for (let product of products) {
                let productX = this.#storeHouse.getProduct(parseInt(product)); //al ser un string se convierte en number
                this.#storeHouse.removeProduct(productX);
                this.#storeHouse.removeProductShop(productX);
                productsDel.push(productX);
            }
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#storeHouseView.showRemoveProductModal(done, productsDel, position, error);
    }

    handleRemoveProductShopForm = () => {
        this.#storeHouseView.showRemoveProShopForm(this.#storeHouse.getShops());
        this.#storeHouseView.bindSelectProductShopForm(this.handleRemoveProductInShop);
    }

    handleRemoveProductInShop = (cif) => {
        this.#storeHouseView.showRemoveProductShopForm(this.#storeHouse.getProductinShopsCif(cif));
        this.#storeHouseView.bindRemoveProductShopForm(this.handleRemoveProductShop);
    }

    handleRemoveProductShop = (products, shop) => {
        let done, error, position;
        let productsDel = new Array();
        try {
            for (let product of products) {
                let productX = this.#storeHouse.getProduct(parseInt(product)); //al ser un string se convierte en number
                this.#storeHouse.removeProductInShop(productX, shop);
                productsDel.push(productX);
            }
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#storeHouseView.showRemoveProductShopModal(done, productsDel, this.#storeHouse.getExistShop(shop, this.#storeHouse.getShops()), error);
    }

    handleChangeBackgroundColor = () => {
        $('#changeColorSelect').on('change', function () {
            let color = $(this).val();
            if (color === "grey") {
                $('body').css("background-image", 'none');
                $('body').css("background-color", 'rgba(187, 183, 183, 0.425)');
                $('body').css("color", 'black');
                $('footer').css("background-color", 'rgba(62, 73, 126, 0.253');
                $('h2').css("color", 'black');
            } else {
                $('body').css("background-image", 'url("../img/dark-canvas.gif")');
                $('body').css("color", 'white');
                $('footer').css("background-color", 'rgba(196, 233, 255, 0.253)');
                $('h2').css("color", 'white');
            }
        });
    }

    handleAddStockProShopForm = () => {
        this.#storeHouseView.showAddStockProShopForm(this.#storeHouse.getShops());
        this.#storeHouseView.bindSelectShopStockForm(this.handleAddStockProShopForm2);
    }

    handleAddStockProShopForm2 = (cif) => {
        this.#storeHouseView.showAddStockProShopForm2(this.#storeHouse.getProductinShopsCif(cif));
        this.#storeHouseView.bindSelectProdStockForm(this.handleAddStockProInShop);
    }

    handleAddStockProInShop = (product, stock, shop) => {
        let done, error, stockPod, productX;
        try {
            productX = this.#storeHouse.getProduct(parseInt(product)); //al ser un string se convierte en number para que no dé error
            stockPod = this.#storeHouse.addQuantityProductInShop(productX, parseInt(stock), shop);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#storeHouseView.showAddStockProShopModal(done, productX, stockPod, this.#storeHouse.getExistShop(shop, this.#storeHouse.getShops()), error);
    }

    handleLocationStores = () => {
        this.#storeHouseView.showLocationStores();
    }

    /* Cookies */
    handleLoginForm = () => {
        this.#storeHouseView.showLogin();
        this.#storeHouseView.bindLogin(this.handleLogin);
    }

    handleLogin = (username, password, remember) => {
        if (this.#auth.validateUser(username, password)) {
            this.#user = this.#auth.getUser(username);
            this.onOpenSession();
            this.onInit();
            if (remember) {
                this.#storeHouseView.setUserCookie(this.#user);
            }
        }
    }

    onOpenSession() {
        this.#storeHouseView.showAuthUserProfile(this.#user);
        this.#storeHouseView.showValidUserMessage(this.#user);
        this.#storeHouseView.bindCloseSession(this.handleCloseSession);
        this.#storeHouseView.showAdminMenu();
        this.#storeHouseView.bindAdminMenu(
            this.handleNewShopForm,
            this.handleRemoveShopForm,
            this.handleNewCategoryForm,
            this.handleRemoveCategoryForm,
            this.handleNewProductForm,
            this.handleRemoveProductForm,
            this.handleRemoveProductShopForm,
            this.handleAddStockProShopForm
        );
        this.#storeHouseView.initHistory();
    }

    onCloseSession() {
        this.#user = null;
        this.#storeHouseView.deleteUserCookie();
        this.#storeHouseView.showIdentificationLink();
        this.#storeHouseView.bindIdentificationLink(this.handleLoginForm);
        this.#storeHouseView.removeAdminMenu();
    }

    handleCloseSession = () => {
        this.onCloseSession();
    }

    handleShowBackup = () => {
        this.#storeHouseView.showBackupModal();
    }

    handleShowInfoStoreHouse = () => {
        let string;
        for (const tiendas of this.#storeHouse.shops) {
            string += JSON.stringify(tiendas);
        }
        for (const categorias of this.#storeHouse.categories) {
            string += JSON.stringify(categorias);
        }
        for (const product of this.#storeHouse.products) {
            string += JSON.stringify(product);
        }
        this.#storeHouseView.showDataStoreHouse(string);
    }

    bindshowProductInNewWindow = () => {
        this.#storeHouseView.showFavs();
    }

    handleFav = (serialNumber) => {
        let favs = new Array();
        if (localStorage.getItem('fav') !== null) {
            favs = JSON.parse(localStorage.getItem('fav'));
            if (!favs.includes(parseInt(serialNumber))) {
                favs.push(parseInt(serialNumber));
                localStorage.setItem('fav', JSON.stringify(favs));
            }
        } else {
            favs.push(parseInt(serialNumber));
            localStorage.setItem('fav', JSON.stringify(favs));
        }
    }

    handleShowFavs = () => {
        if (localStorage.getItem('fav') !== null) {
            let favs = JSON.parse(localStorage.getItem('fav'));
            let arr = new Array();

            for (let serialNumber of favs) {
                let product = this.#storeHouse.getProduct(serialNumber);
                if (product instanceof Product) arr.push(product);
            }
            this.#storeHouseView.showFavs(arr);
        }
    }
}

export default ManagerController;