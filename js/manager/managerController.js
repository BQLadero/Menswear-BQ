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

class ManagerController {
    #storeHouse;
    #storeHouseView;

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
        let product1 = new Traje(1, 'JPRFanco Suit', 74.99, 188, 'Botón', 'Lavar en seco', 'Hombrera', "Traje de gala", 5, './img/traje-zalando-1.png');
        storeHouse.addProduct(product1, category5);
        storeHouse.addProductInShop(product1, store1, 7);
        storeHouse.addProductInShop(product1, store2, 7);

        let product2 = new Traje(2, 'Tropical Active', 159.99, 189, 'Botón', 'Lavar en seco', 'no', "Traje de gala", 5, './img/traje-zalando-2.png');
        storeHouse.addProduct(product2, category5);
        storeHouse.addProductInShop(product2, store1, 2);

        let product3 = new Traje(3, 'Plain mens suit', 149.95, 192, 'Botón', 'Lavar en seco', 'Tira de botones, hombrera', "Traje de gala", 5, './img/traje-zalando-3.png');
        storeHouse.addProduct(product3, category5);
        storeHouse.addProductInShop(product3, store2, 3);
        storeHouse.addProductInShop(product3, store3, 3);

        let product4 = new Traje(4, 'Blazer Conjunto Relaxed', 79.95, 188, 'Botón', 'No usar secadora', 'Bolsillo interior', "Traje de gala", 5, './img/traje-zara.png');
        storeHouse.addProduct(product4, category2);
        storeHouse.addProductInShop(product4, store3, 1);

        let product5 = new Traje(5, 'Regular Fit', 117.99, 175, 'Botón y Cremallera', 'Lavar en ciclo de lavado suave a 40°', 'no', "Traje de gala", 5, './img/traje-c&a.png');
        storeHouse.addProduct(product5, category4);
        storeHouse.addProductInShop(product5, store2, 4);

        /*BOTAS*/
        let product6 = new Bota(6, 'Bota acordonada piso Track', 39.99, 39, 'Cordones y Cremallera', 'Track', 'Termica', "Zapato tipo bota acordonada disponible en varios colores"
            , 0, './img/botas-p&b-1.png');
        storeHouse.addProduct(product6, category1);
        storeHouse.addProductInShop(product6, store1, 7);

        let product7 = new Bota(7, 'Bota acordonada suela track', 25.99, 44, 'Cordones', 'Track', 'Bioeco', "Zapato tipo bota acordonada disponible en varios colores"
            , 0, './img/botas-p&b-2.png');
        storeHouse.addProduct(product7, category1);
        storeHouse.addProductInShop(product7, store2, 4);
        storeHouse.addProductInShop(product7, store3, 3);

        let product8 = new Bota(8, 'Bota cordones', 39.95, 41, 'Cordones', 'Volumen', 'Poliuretano', "Bota de cordones. Disponible en color burdeos y en marrón."
            , 0, './img/botas-zara-1.png');
        storeHouse.addProduct(product8, category2);
        storeHouse.addProductInShop(product8, store2, 2);

        let product9 = new Bota(9, 'Bota cordones engomada', 49.95, 40, 'Cordones', 'Track', 'Poliéster', "Bota con cordones. Corte liso con acabado engomado."
            , 0, './img/botas-zara-2.png');
        storeHouse.addProduct(product9, category2);
        storeHouse.addProductInShop(product9, store1, 8);

        let product10 = new Bota(10, 'Botas Chelsea', 39.99, 43, 'No contiene cierre', 'Goma termoplástica', 'Algodón ', "Botas Chelsea en ante sintético con elásticos laterales y trabilla detrás. Tacón 3 cm."
            , 0, './img/botas-h&m.png');
        storeHouse.addProduct(product10, category3);
        storeHouse.addProductInShop(product10, store1, 17);
        storeHouse.addProductInShop(product10, store2, 5);

        /*PANTALONES*/
        let product11 = new Pantalon(11, 'Joggers cargo Skinny Fit', 23.99, "Elástica", 'Cordones', 'Al bies y bolsillos traseros ', 'Algodón ', "Joggers en sarga de algodón con cintura elástica y cordón de ajuste"
            , 0, './img/pantalones-h&m-1.png');
        storeHouse.addProduct(product11, category3);
        storeHouse.addProductInShop(product11, store1, 7);
        storeHouse.addProductInShop(product11, store3, 4);
        storeHouse.addProductInShop(product11, store2, 3);

        let product12 = new Pantalon(12, 'Joggers cargo', 27.99, 'Elástica', 'Cordones', 'Al bies y bolsillos traseros', "Algodón", "Joggers de algodón con elástico revestido y cordón de ajuste en la cintura",
            0, './img/pantalones-h&m-2.png');
        storeHouse.addProduct(product12, category3);
        storeHouse.addProductInShop(product12, store3, 7);
        storeHouse.addProductInShop(product12, store2, 7);

        let product13 = new Pantalon(13, 'Chinos slim fit', 49.99, 'Elástica', 'Botón', 'Al bies por delante y un bolsillo pequeño, dos bolsillos ribeteados por detrás.', "Algodón y Elastano",
            "Chinos ceñidos de tejido elástico. Con dos bolsillos al bies por delante y un bolsillo pequeño, dos bolsillos ribeteados por detrás.", 0, './img/pantalones-c&a-1.png');
        storeHouse.addProduct(product13, category4);
        storeHouse.addProductInShop(product13, store1, 4);
        storeHouse.addProductInShop(product13, store3, 5);

        let product14 = new Pantalon(14, 'Pantalón de deporte - fitness', 24.99, 'Elástica', 'Cordones', 'Dos bolsillos con cremalleras a los lados', "Poliéster y Algodón", 
            "Pantalón de deporte de felpa lisa. Dos bolsillos con cremalleras a los lados y pespuntes estilo biker de adorno delante. Puños de canalé en los bajos.", 0, './img/pantalones-c&a-2.png');
        storeHouse.addProduct(product14, category4);
        storeHouse.addProductInShop(product14, store1, 2);
        storeHouse.addProductInShop(product14, store1, 11);
        storeHouse.addProductInShop(product14, store3, 14);

        let product15 = new Pantalon(15, 'Pantalón Confort Pliegue', 29.95, 'Elástica y confortable', 'Botón y Cremallera', 'En delantero y detalle de bolsillos de vivo en espalda', "Poliéster, viscosa y elastano", 
            "Pantalón confeccionado en tejido de estructura elástica y confortable. Detalle de pliegues frontales en cintura.", 0, './img/pantalones-zara.png');
        storeHouse.addProduct(product15, category2);
        storeHouse.addProductInShop(product15, store2, 1);

        /*CALCETINES*/
        let product16 = new Calcetin(16, 'Heatgear Locut', 7.95, "Deporte", 'Tobileros', 'Punto', 3, "Calcetines de deporte", 0, './img/calcetines-zalando.png');
        storeHouse.addProduct(product16, category5);
        storeHouse.addProductInShop(product16, store1, 3);
        storeHouse.addProductInShop(product16, store3, 2);

        let product17 = new Calcetin(17, 'Calcetines', 3.99, "Jacquard", 'Largos', 'Algodón, Poliamida y Elastano', 1, "Calcetines de bob Esponja", 0, './img/calcetines-c&a.png');
        storeHouse.addProduct(product17, category4);
        storeHouse.addProductInShop(product17, store2, 4);
        storeHouse.addProductInShop(product17, store3, 50);

        let product18 = new Calcetin(18, 'Pack de 10 calcetines', 14.39, "Tela", 'Medianos', 'Algodón, Poliamida y Elastano', 10, "Calcetines de Tela", 0, './img/caltines-h&m.png');
        storeHouse.addProduct(product18, category3);
        storeHouse.addProductInShop(product18, store1, 12);

        let product19 = new Calcetin(19, 'Calcetines Jacquard The Beathles', 12.95, "THE BEATLES", 'Largos', 'Algodón, Poliamida y Elastano', 2, "Pack de calcetines con jacquard The Beatles. Acabados en rib.",
            0, './img/calcetines-zara.png');
        storeHouse.addProduct(product19, category1);
        storeHouse.addProductInShop(product19, store2, 10);

        let product20 = new Calcetin(20, 'Calcetines Altos', 7.99, "Tela", 'Largos', 'Algodón, Poliamida y Elastano', 3, "JOIN LIFE Care for fiber & Care for water: At least 75% of Ecologically Grown Cotton.",
             0, './img/calcetines-p&b.png');
        storeHouse.addProduct(product20, category1);
        storeHouse.addProductInShop(product20, store1, 70);
    }

    constructor(model, view) {
        this.#storeHouse = model;
        this.#storeHouseView = view;

        this.onLoad();
        this.onInit();
        this.#storeHouseView.bindInit(this.handleInit);
        this.#storeHouseView.closeWindows();
        //this.#storeHouseView.bindProductsTypeList(this.handleProductsTypeList);
        
    }

    onLoad = () => {
        this.#loadManagerObjects(); //Llamada a la funcion de creación de objectos
        this.onAddCategory();
        this.onAddShop();
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
        this.#storeHouseView.listProducts(products, category.title);
        //this.#storeHouseView.bindShowProduct(this.handleShowProduct); //Muestra el producto con sus caracteristicas
        //this.#storeHouseView.bindshowProductInNewWindow(this.handleShowProduct);
        this.#storeHouseView.bindshowProductInNewWindow();
    }

    handleShopProductsList = (shop) => {
        this.#storeHouseView.listShopProducts((this.#storeHouse.getProductinShops(shop)), shop);
        //this.#storeHouseView.bindShowProduct(this.handleShowProduct);
        console.log("hola");
        this.#storeHouseView.bindshowProductInNewWindow();
    }

    handleTypeProductsList = (type) =>{
        this.#storeHouseView.listTypeProducts(this.#storeHouse.getTypeProduct(type), type);
        //this.#storeHouseView.bindShowProduct(this.handleShowProduct);
        this.#storeHouseView.bindshowProductInNewWindow(this.handleShowProduct);
    }

    handleShowProduct = (serial) => {
		try {
			let product = this.#storeHouse.getProduct(Number.parseInt(serial));
			//this.#storeHouseView.showProduct(product);
            this.#storeHouseView.bindshowProductInNewWindow(product);
            //this.handleShowProductInNewWindow esto va en el bindshowProductInNewWindow
		} catch (error) {
			this.#storeHouseView.showProduct(null, 'No existe este producto en la página.');
		}
	}

}

export default ManagerController;