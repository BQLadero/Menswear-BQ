import { StoreHouse } from './manager.js';
//, newProductValidation
import {showFeedBack, defaultCheckElement, newCategoryValidation, removeCategoryValidation, newShopValidation, removeShopValidation} from './validation.js';

class ManagerView {

	//Objecto History
	#excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
		handler(...handlerArguments);
		$(scrollElement).get(0).scrollIntoView();
		history.pushState(data, null, url);
		event.preventDefault();
	}

	//Función creada para mostrar los productos y no tener que crearla x veces
	#showProductInNewWindow(window, product, message) {
		let main = $(window.document).find('main');
		let header = $(window.document).find('header nav');
		let container;
		if (product) {
			window.document.title = `Especificaciones del producto: ${product.name}`;
			header.append(`<h1 data-serial="${product.serialNumber}" class="text-center">${product.name}</h1>`);
			//<img id="main-image" src="${product.images2}"/> 
			container = $(`
			<div id="single-product" class="${product.constructor.name}-style container mt-5 mb-5">
				<div class="row d-flex text-center">
					<div class="col-md-10">
						<div class="card">
							<div class="row">
								<div class="col-md-6">
									<div class="p-3">
										<div id="carousel-${product.serialNumber}" class="carousel slide" data-ride="carousel">
											<div class="carousel-inner"></div>
											<a class="carousel-control-prev" href="#carousel-${product.serialNumber}" role="button" data-slide="prev">
												<span class="carousel-control-prev-icon" aria-hidden="true"></span>
												<span class="sr-only">Previous</span>
											</a>
											<a class="carousel-control-next" href="#carousel-${product.serialNumber}" role="button" data-slide="next">
												<span class="carousel-control-next-icon" aria-hidden="true"></span>
												<span class="sr-only">Next</span>
											</a>
										</div>
									</div>
								</div>
								<div class="col-md-6 text-center">
									<div class="mt-4 mb-3">
										<h5 class="text-uppercase">${product.name}</h5>
										<div class="text-center">
											<span class="act-price">${product.price} €</span>
										</div>
									</div>
									<div class="mt-3">
										<h6 class="text-uppercase">Características</h6>
									</div>
									<p class="about">${product.description}</p>
									<div class="mt-4 align-items-center"> 
										<button data-serial="${product.serialNumber}" class="btn btn-primary text-uppercase mr-2 px-4">
										<i class="icon-plus"></i>&nbsp;Comprar
										</button>
										<button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">
											Cerrar
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`);

			for (let index = 0; index < product.images2.length; index++) {
				let carImg = "";
				if (index === 0) {
					carImg = $(`
						<div class="carousel-item active">
							<a data-serial="${product.serialNumber}" href="#single-product" class="img-wrap text-center">
								<img class="d-block w-100" id="${product.serialNumber}" src="${product.images2[index]}" alt="${product.name}">
							</a>
						</div>
					`);
				} else {
					carImg = $(`
						<div class="carousel-item">
							<a data-serial="${product.serialNumber}" href="#single-product" class="img-wrap text-center">
								<img class="d-block w-100" id="${product.serialNumber}" src="${product.images2[index]}" alt="${product.name}">
							</a>
						</div>
					`);
				}
				$(container).find('.carousel-inner').append(carImg);
			}
		} else {
			container = $(`
			<div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
		}
		main.append(container);
		window.document.body.scrollIntoView();
	}

	constructor() {
		//Parametros
		this.menu = $('.navbar-nav');
		this.main = $('.cuerpo__espe');
		this.publi = $('.publicidad');
		this.openWindows = new Map();
		this.close = $('#close');
		this.search = $('.busqueda');
		this.search2 = $('.busqueda--regis');
		this.shopping = $('busqueda--regis > button');
		this.storeHouse = StoreHouse.getInstance(); //Creo este parametro unicamente para la ventana emergente
	}

	bindInit(handler) { //Recarga la página
		$('#logo').click((event) => {
			this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
		});
		$('#init').click((event) => {
			this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
		});
		this.close.css("display", "none");
	}

	showShops(shops) {
		this.main.empty();
		let container = $('<div id="shops-products" class="row"></div>');
		for (let shop of shops) {
			container.append(`<div class="col mt-5 text-center">
				<a data-category="${shop.name}" href="#product-list">
					<div class="cat-list-image">
						<img alt="${shop.name}" src="https://via.placeholder.com/258x172.jpg?text=${shop.name}" />
					</div>
				</a>
				<div class="mlf--shops">
					<h3>${shop.name}</h3>
					<div class="ms-5">${shop.address}</div>
					<div class="ms-5">${shop.phone}</div>
				</div>
			</div>`);
		}
		this.main.append(`<h1 class="text-center">Tiendas</h1>`);
		this.main.append(container);
	}

	showShopsInMenu(shops) {
		//Con boostrap 5 no funciona, es decir, no se desplega el menu
		let link = $('#navShops');

		let container;
		/*Al meter nuevas categorias con el formulario hayq eu poner esta condicion, para que borre las que existen y se actulicen con las nuevas. 
			Si no se usiera esta condicion, crea un nuevo menu sin funcionalidad*/
		if (link.length === 1){
			container = link.next();
			container.children().remove();
			link.parent().append(container);
		}else{
			container = $('<div class="dropdown-menu" aria-labelledby="navShops"></div>');
			let li = $(`<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navShops" role="button" data-toggle="dropdown" 
					aria-haspopup="true" aria-expanded="false">
					Tiendas
				</a>
			</li>`);
			li.append(container);
			this.menu.append(li);
		}
		
		for (let shop of shops) {
			container.append(`<a data-category="${shop.name}" class="dropdown-item" href="#product-list">${shop.name}</a>`);
		}
		
	}

	listShopProducts(products, shop) {
		this.main.empty();
		let container = $(`<div id="shop-list" class="container">
								<div class="row"> </div>
							</div>`);
		for (let product of products) {
			let div = $(`
			<div class="col ajustar">
				<figure class="card text-center">
					<a data-serial="${product.serialNumber}" href="#single-product" class="img-wrap text-center">
						<img class="w-75" id="${product.serialNumber}" alt="${product.name}"  src="${product.images2[0]}">
					</a>					
					<figcaption class="info-wrap mt-3">
							<a data-serial="${product.serialNumber}" href="#single-product" class="text-info h4">
								${product.name}
							</a>
					</figcaption>
					<div  class="text-center"> 
						<div> 
							<p class="price h5 text-danger">${product.price} €</p> 
							<p class="text-success">Producto rebajado de precio</p>
						</div>
						<a href="#" data-serial="${product.serialNumber}" class="btn btn-primary">
						<i class="icon-plus"></i>&nbsp;Comprar 
						</a> 
					</div>
				</figure>
			</div>`);
			container.children().first().append(div);
		}
		container.prepend(`<h2 class="text-center">Productos de la tienda ${shop}</h2>`);
		this.main.append(container);
	}

	bindShopProductsList(handler) {
		$('#shops-products').find('a').click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#excecuteHandler(
				handler, [category],
				'#shop-list',
				{ action: 'productsShopList', category: category },
				'#shop-list', event
			);
		});

		$('#navShops').next().children().click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#excecuteHandler(
				handler, [category],
				'#shop-list',
				{ action: 'productsShopList', category: category },
				'#shop-list', event
			);
		});
	}

	showCategoriesInMenu(categories) {
		//Con boostrap 5 no funciona, es decir, no se desplega el menu
		let link = $('#navCats');

		let container;
		/*Al meter nuevas categorias con el formulario hayq eu poner esta condicion, para que borre las que existen y se actulicen con las nuevas. 
			Si no se usiera esta condicion, crea un nuevo menu sin funcionalidad*/
		if (link.length === 1){
			container = link.next();
			container.children().remove();
			link.parent().append(container);
		}else{
			container = $('<div class="dropdown-menu" aria-labelledby="navCats"></div>');
			let li = $(`
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown" 
					aria-haspopup="true" aria-expanded="false">
					Categorías
				</a>
			</li>`);
			li.append(container);
			this.menu.append(li);
		}

		for (let category of categories) {
			container.append(`<a data-category="${category.title}" class="dropdown-item" href="#productlist">${category.title}</a>`);
		}

	}

	listCategoriesProducts(products, title) {
		this.main.empty();
		let container = $(`<div id="product-list" class="container my-3 w-100">
								<div class="row"> </div>
							</div>`);
		for (let product of products) {
			let div = $(`
			<div class="col">
				<figure class="card card-product-grid card-lg"> 
					<a data-serial="${product.serialNumber}" href="#single-product" class="img-wrap text-center">
                        <img class="w-75" src="${product.images2[0]}">
					</a>
					<figcaption class="info-wrap text-center">
							<a data-serial="${product.serialNumber}" href="#single-product" class="h4">
								${product.name}
							</a>
					</figcaption>
					<div class="text-center"> 
						<div> 
							<p class="price h5 text-danger">${product.price} €</p> 
							<p class="text-success">Producto rebajado de precio</p>
						</div>
						<a href="#" data-serial="${product.serialNumber}" class="btn btn-primary">
							<i class="icon-plus"></i>&nbsp;Comprar 
						</a> 
					</div>
				</figure>
			</div>`);
			container.children().first().append(div);
		}
		container.prepend(`<h2 class="text-center">Productos de ${title}</h2>`);
		this.main.append(container);
	}

	bindProductsCategoryListInMenu(handler) {
		$('#navCats').next().children().click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#excecuteHandler(
				handler, [category],
				'#product-list',
				{ action: 'productsCategoryList', category: category },
				'#category-list', event
			);
		});
	}

	listTypeProducts(products, type) {
		this.main.empty();
		let container = $(`<div id="type-list" class="container my-3 w-100">
								<div class="row"> </div>
							</div>`);
		for (let product of products) {
			let div = $(`
			<div class="col">
				<figure class="card text-center"> 
					<a data-serial="${product.serialNumber}" href="#single-product" class="img-wrap text-center">
                        <img class="w-100" src="${product.images2[0]}">
					</a>
					<figcaption class="info-wrap text-center">
							<a data-serial="${product.serialNumber}" href="#single-product" class="h4">
								${product.name}
							</a>
					</figcaption>
					<div  class="text-center"> 
						<div> 
							<p class="price h5 text-danger">${product.price} €</p> 
							<p class="text-success">Producto rebajado de precio</p>
						</div>
						<a href="#" data-serial="${product.serialNumber}" class="btn btn-primary">
							<i class="icon-plus"></i>&nbsp;Comprar 
					</a> 
					</div>
				</figure>
			</div>`);
			container.children().first().append(div);
		}
		container.prepend(`<h2 class="text-center">Productos tipo ${type}</h2>`);
		this.main.append(container);
	}

	bindTypeProductsListInMenu(handler) {
		$('#navProds').next().children().click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#excecuteHandler(
				handler, [category],
				'#type-list',
				{ action: 'productsTypeList', category: category },
				'#type-list', event
			);
		});
	}

	showProductInNewWindow(window, product, message) {
		let main = $(this.ventana.document).find('main');
		let header = $(this.ventana.document).find('header nav');
		main.empty();
		header.empty();
		let container;
		if (product) {
			this.ventana.document.title = `Especificaciones del producto: ${product.name}`;
			header.append(`<h1 data-serial="${product.serialNumber}" class="text-center">${product.name}</h1>`);
			container = $(`
			<div id="single-product" class="${product.constructor.name}-style container mt-5 mb-5">
				<div class="row d-flex text-center">
					<div class="col-md-10">
						<div class="card">
							<div class="row">
								<div class="col-md-6">
									<div class="p-3">
										<div class="text-center p-4"> <img id="main-image" src="${product.images2}"/> </div>
									</div>
								</div>
								<div class="col-md-6 text-center">
									<div class="mt-4 mb-3">
										<h5 class="text-uppercase">${product.name}</h5>
										<div class="text-center">
											<span class="act-price">${product.price} €</span>
										</div>
									</div>
									<div class="mt-3">
										<h6 class="text-uppercase">Características</h6>
									</div>
									<p class="about">${product.description}</p>
									<div class="mt-4 align-items-center"> 
										<button data-serial="${product.serialNumber}" class="btn btn-primary text-uppercase mr-2 px-4">
											<i class="icon-plus"></i>&nbsp;Comprar
										</button>
										<button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">
											Cerrar
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`);

			//container.find('h6').after(this.#instance[product.constructor.name]);

		} else {
			container = $(`
			<div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
		}
		main.append(container);
		this.ventana.document.body.scrollIntoView();
	}

	bindshowProductInNewWindow(serial) {
		//Al a ver tres opciones (categorias, productos y tiendas) creo una opcion para cada una.
		$('#product-list').find('a.img-wrap').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			let product = this.storeHouse.getProduct(Number.parseInt(serial)); //Sacamos el producto, através del serialNumber
			if (this.openWindows.size === 0) {
				this.close.css("display", "block");
				this.search.css("width", "40%");
				this.search2.css("width", "25%");
			}

			//Si el producto no está abierto en una ventana secundaria, se crea la nueva ventana y se le añade al mapa.
			if (!this.openWindows.has(serial)) {
				/*La primera opcion en el open le añado a la nueva ventana la página que va abrir (siempre open) con la ruta
					del producto en cuestión.
					Como se van abrir x ventanas le añado al nombre de la ventana su serialNumber para que se puedan las ventanas 
					que queramos*/
				let productWindow = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
				productWindow.addEventListener('DOMContentLoaded', () => {
					this.#showProductInNewWindow(productWindow, product);//Llama a la función para que pinte las especificaciones
				});
				this.openWindows.set(serial, productWindow);
				//Al mapa le añado como clave el serialNumber del producto en cuestión, además de la ventana creada.
			} else {
				//Si el producto ya está añadido al mapa, recorro el mapa
				for (let [key, value] of this.openWindows) {
					//Comprobamos que el serialNumber introducido al pinchar en la imagen es el mismo al que tenemos guardado en nuestro mapa
					if (key === serial) {
						if (value.closed) {
							//Si la ventana estuviera cerrada la volvemos abrir
							value = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
							value.addEventListener('DOMContentLoaded', () => {
								this.#showProductInNewWindow(value, product);
							});
						} else {
							//Sino ponemos el foco en ella, es decir, como está minimizada la mostramos.
							value.focus();
						}
					}
				}
			}
		});

		$('#shop-list').find('a.img-wrap').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			let product = this.storeHouse.getProduct(Number.parseInt(serial));
			if (this.openWindows.size === 0) {
				this.close.css("display", "block");
				this.search.css("width", "35%");
				this.search2.css("width", "15%");
				//this.search2.css("margin-left", "5%");
				//this.shopping.css("width", "40%");
			}

			if (!this.openWindows.has(serial)) {
				let productWindow = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
				productWindow.addEventListener('DOMContentLoaded', () => {
					this.#showProductInNewWindow(productWindow, product);
				});
				this.openWindows.set(serial, productWindow);
			} else {
				for (let [key, value] of this.openWindows) {
					if (key === serial) {
						if (value.closed) {
							value = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
							value.addEventListener('DOMContentLoaded', () => {
								this.#showProductInNewWindow(value, product);
							});
						} else {
							value.focus();
						}
					}
				}
			}
		});

		$('#type-list').find('a.img-wrap').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			let product = this.storeHouse.getProduct(Number.parseInt(serial));
			if (this.openWindows.size === 0) {
				this.close.css("display", "block");
				this.search.css("width", "40%");
				this.search2.css("width", "20%");
				this.shopping.css("width", "50%");
			}

			if (!this.openWindows.has(serial)) {
				let productWindow = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
				productWindow.addEventListener('DOMContentLoaded', () => {
					this.#showProductInNewWindow(productWindow, product);
				});
				this.openWindows.set(serial, productWindow);
			} else {
				for (let [key, value] of this.openWindows) {
					if (key === serial) {
						if (value.closed) {
							value = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
							value.addEventListener('DOMContentLoaded', () => {
								this.#showProductInNewWindow(value, product);
							});
						} else {
							value.focus();
						}
					}
				}
			}
		});
	}

	closeWindows() { //Cierra todas la ventanas secundarias abiertas que esten dentro del mapa
		$('#closeWindows').click((event) => {
			for (let [key, value] of this.openWindows) {
				value.close();
				this.openWindows.delete(key);
			}
			//Al no quedar ninguna ventana abierta, se vuelve a quitar la opcion del menú
			this.close.css("display", "none");
			this.search.css("width", "50%");
			this.search2.css("width", "25%");
			this.shopping.css("width", "50%");
		});
	}

	/* Administración */

    bindAdminMenu(hNewShop, hRemoveShop, hNewCategory, hRemoveCategory){
		$('#lnewShop').click((event) => {
			this.#excecuteHandler(hNewShop, [], '#new-shop', {action: 'newShop'}, '#', event);
		});
		$('#ldelShop').click((event) => {
			this.#excecuteHandler(hRemoveShop, [], '#remove-shop', {action: 'removeShop'}, '#', event);
		});
		$('#lnewCategory').click((event) => {
			this.#excecuteHandler(hNewCategory, [], '#new-category', {action: 'newCategory'}, '#', event);
		});
		$('#ldelCategory').click((event) => {
			this.#excecuteHandler(hRemoveCategory, [], '#remove-category', {action: 'removeCategory'}, '#', event);
		});/*
		$('#lnewProduct').click((event) => {
			this.#excecuteHandler(hNewProduct, [], '#new-product', {action: 'newProduct'}, '#', event);
		});
		$('#ldelProduct').click((event) => {
			this.#excecuteHandler(hRemoveProduct, [], '#remove-product', {action: 'removeProduct'}, '#', event);
		});*/
	}

	showNewShopForm() {
		let container = $(`		
		<div class="modal fade" id="new-shop" data-backdrop="static" data-keyboard="false" tabindex="1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-body" id="new-shop">Añadir nueva Tienda</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="text-body h3" aria-hidden="true">&times;</span>
                                </button>
                            </div>
							<form name="fNewShop" role="form" method="post" novalidate>
								<div class="modal-body text-body">
									<div class="form-row">
										<div class="col-md-6 mb-3">
											<label for="nifShop">NIF *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="nifShop"><i class="icon-male"></i></span>
												</div>
												<input type="text" class="form-control" id="nifShop" name="nifShop" placeholder="NIF de la tienda"
													aria-describedby="nifShop" value="" required>
												<div class="invalid-feedback">El NIF es obligatorio.</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3">
											<label for="nameShop">Nombre *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="nameShop"><i class="icon-group"></i></span>
												</div>
												<input type="text" class="form-control" id="nameShop" name="nameShop" placeholder="Nombre de la tienda"
													aria-describedby="nameShop" value="" required>
												<div class="invalid-feedback">El nombre es obligatorio.</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-12 mb-3">
											<label for="addressShop">Dirección *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="addressShop"><i class="icon-map-marker"></i></span>
												</div>
												<input type="text" class="form-control" id="addressShop" name="addressShop"
													aria-describedby="addressShop" value="" required placeholder="Dirección de la tienda">
												<div class="invalid-feedback">La dirección es obligatoria</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3">
											<label for="phoneShop">Telefono *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="phoneShop"><i class="icon-phone"></i></span>
												</div>
												<input type="number" class="form-control" id="phoneShop" name="phoneShop" placeholder="Teléfono de la tienda"
													aria-describedby="phoneShop" value="" required>
												<div class="invalid-feedback">El teléfono es obligatorio.</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3">
											<label for="coordsShop">Coordenadas *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="coordsShop"><i class="icon-map-marker"></i></span>
												</div>
												<input type="text" class="form-control" id="coordsShop" name="coordsShop" placeholder="Coordenadas de la tienda"
													aria-describedby="coordsShop" value="" required>
												<div class="invalid-feedback">Las coordenadas son obligatorias.</div>
												<div class="valid-feedback">Correctas.</div>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<button class="btn btn-primary" type="submit">Enviar</button>
									<button class="btn btn-primary" type="reset">Borrar</button>
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								</div>
							</form>
                        </div>
                    </div>
                </div>`);
		$('body').append(container); //Se añade el modal al body, si se añade al main da error
	}

	bindNewShopForm(handler){ //Validación de la nueva Tienda
		newShopValidation(handler);
	}
	
	showNewShopModal(done, shop, error) {//creación del modal para comprobar si se ha añadido correctamente o no
		$("#new-shop").modal('hide'); //Cerrar el otro modal para que no haya conflicto
		$(document.fNewShop).find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="newShopModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newShopModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="newShopModalLabel">Categoría creada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-body">
							La categoría <strong>${shop.name}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let newShopModal = $('#newShopModal');
			newShopModal.modal('show');
			newShopModal.find('button').click(() => {
				newShopModal.on('hidden.bs.modal', function (event) {
					document.fNewShop.reset();
					document.fNewShop.nifShop.focus();
					this.remove();
				});
				newShopModal.modal('hide');
			});
		} else {
			$(document.fNewShop).prepend(`<div class="error text-danger p-3"><i class="icon-exclamation-sign"></i> La Tienda <strong>${shop.name}</strong> ya está creada.</div>`);
		}
	}

	showRemoveShopForm(shops){
		let container = $(`		
		<div class="modal fade" id="remove-shop" data-backdrop="static" data-keyboard="false" tabindex="1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-body" id="remove-shop">Borrar una Tienda</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="text-body h3" aria-hidden="true">&times;</span>
                                </button>
                            </div>
							<form name="fRemShop" role="form" method="post" novalidate>
								<div class="modal-body text-body text-justify">
									<div class="form-row">
										<div class="col-md-12 mb-3">
											<label for="ncShop">Tiendas *</label>
											<div class="input-group" id="colRemShop">
												<div class="invalid-feedback">La categoría es obligatoria.</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<button class="btn btn-primary" type="submit">Eliminar</button>
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								</div>
							</form>
                        </div>
                    </div>
                </div>`);
		$('body').append(container);

		let select =  $(`
			<div class="input-group-prepend">
				<span class="input-group-text" id="titlePrepend"><i class="icon-group"></i></span>
			</div>
			<select class="form-control" id="selectRemoveShop" name="selectRemoveShop"> required>			
			</select>`);
		$('#colRemShop').append(select);
		console.log(shops);
		for (let shop of shops) {
			let option = $(`<option value="${shop.name}">${shop.name}</option>`);
			$('#selectRemoveShop').append(option);
		}
	}
	
	bindRemoveShopForm(handler){
		removeShopValidation(handler);
	}

	showRemoveShopModal(done, shop, position, error) {
		$('#remove-category').modal('hide');
		$('remove-category').find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="removeShopModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="removeCategoryModalLabel">Tienda eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-body">
							La tienda <strong>${shop.name}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeShopModal = $('#removeShopModal');
			removeShopModal.modal('show');
			removeShopModal.find('button').click(() => {
				removeShopModal.on('hidden.bs.modal', function (event) {
					document.fRemCategory.reset();
					document.fRemCategory.selectRemoveCategory.focus();
					this.remove();
				});
				removeShopModal.modal('hide');
			})
		} else {
			$('#removeShopModal').prepend(`<div class="error text-danger p-3"><i class="icon-exclamation-sign"></i> La Tienda <strong>${shop.name}</strong> no exite en el Almacen.</div>`);
		}
	}


	showNewCategoryForm() {
		let container = $(`		
		<div class="modal fade" id="new-category" data-backdrop="static" data-keyboard="false" tabindex="1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-body" id="new-category">Añadir nueva Categoria</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="text-body h3" aria-hidden="true">&times;</span>
                                </button>
                            </div>
							<form name="fNewCategory" role="form" method="post" novalidate>
								<div class="modal-body text-body text-justify">
									<div class="form-row">
										<div class="col-md-12 mb-3">
											<label for="ncTitle">Título *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="titlePrepend"><i class="icon-tag"></i></span>
												</div>
												<input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Título de categoría"
													aria-describedby="titlePrepend" value="" required>
												<div class="invalid-feedback">La categoría es obligatoria.</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-12 mb-3">
											<label for="ncDescription">Descripción</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="descPrepend"><i class="icon-text-height"></i></span>
												</div>
												<input type="text" class="form-control" id="ncDescription" name="ncDescription"
													aria-describedby="descPrepend" value="" required placeholder="Descipción de la categoría">
												<div class="invalid-feedback"></div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<button class="btn btn-primary" type="submit">Enviar</button>
									<button class="btn btn-primary" type="reset">Borrar</button>
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								</div>
							</form>
                        </div>
                    </div>
                </div>`);
		$('body').append(container); //Se añade el modal al body, si se añade al main da error
	}

	bindNewCategoryForm(handler){ //Validación de la nueva categoria
		newCategoryValidation(handler);
	}
	
	showNewCategoryModal(done, cat, error) {//creación del modal para comprobar si se ha añadido correctamente o no
		$("#new-category").modal('hide'); //Cerrar el otro modal para que no haya conflicto
		$(document.fNewCategory).find('div.error').remove();
		console.log(done);
		if (done){
			let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="newCategoryModalLabel">Categoría creada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-body">
							La categoría <strong>${cat.title}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let newCategoryModal = $('#newCategoryModal');
			newCategoryModal.modal('show');
			newCategoryModal.find('button').click(() => {
				newCategoryModal.on('hidden.bs.modal', function (event) {
					document.fNewCategory.reset();
					document.fNewCategory.ncTitle.focus();
					this.remove();
				});
				newCategoryModal.modal('hide');
			})
		} else {
			$(document.fNewCategory).prepend(`<div class="error text-danger p-3"><i class="icon-exclamation-sign"></i> La categoría <strong>${cat.title}</strong> ya está creada.</div>`);
		}
	}

	showRemoveCategoryForm(categories){
		let container = $(`		
		<div class="modal fade" id="remove-category" data-backdrop="static" data-keyboard="false" tabindex="1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-body" id="remove-category">Borrar una Categoria</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="text-body h3" aria-hidden="true">&times;</span>
                                </button>
                            </div>
							<form name="fRemCategory" role="form" method="post" novalidate>
								<div class="modal-body text-body text-justify">
									<div class="form-row">
										<div class="col-md-12 mb-3">
											<label for="ncCategory">Categorías *</label>
											<div class="input-group" id="colRemCat">
												<div class="invalid-feedback">La categoría es obligatoria.</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<button class="btn btn-primary" type="submit">Eliminar</button>
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								</div>
							</form>
                        </div>
                    </div>
                </div>`);
		$('body').append(container);

		let select =  $(`
			<div class="input-group-prepend">
				<span class="input-group-text" id="titlePrepend"><i class="icon-tags"></i></span>
			</div>
			<select class="form-control" id="selectRemoveCategory" name="selectRemoveCategory"> required>
			
			</select>`);
		$('#colRemCat').append(select);
		for (let category of categories) {
			let option = $(`<option value="${category.title}">${category.title}</option>`);
			$('#selectRemoveCategory').append(option);
		}
	}
	
	bindRemoveCategoryForm(handler){
		removeCategoryValidation(handler);
	}

	showRemoveCategoryModal(done, cat, position, error) {
		$('#remove-category').modal('hide');
		$('remove-category').find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="removeCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="removeCategoryModalLabel">Categoría eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-body">
							La categoría <strong>${cat.title}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeCategoryModal = $('#removeCategoryModal');
			removeCategoryModal.modal('show');
			removeCategoryModal.find('button').click(() => {
				removeCategoryModal.on('hidden.bs.modal', function (event) {
					document.fRemCategory.reset();
					document.fRemCategory.selectRemoveCategory.focus();
					this.remove();
				});
				removeCategoryModal.modal('hide');
			})
		} else {
			$('#removeCategoryModal').prepend(`<div class="error text-danger p-3"><i class="icon-exclamation-sign"></i> La categoría <strong>${cat.title}</strong> no exite en el Almacen.</div>`);
		}
	}
}

export default ManagerView;