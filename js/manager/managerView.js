import { StoreHouse } from './manager.js';
//, newProductValidation
import { ocultForm, newCategoryValidation, removeCategoryValidation, newShopValidation, removeShopValidation, newProductValidation, selectTypeValidation, removeProductTypeForm, removeProductShopValidation, removeProductShopForm, selectProductShopFormValidation, selectProductShopForm2Validation, logInFormValidation } from './validation.js';
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
		$('#mapid').css('display', 'none');
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
					<div class="ms-5" id="view-map" data-toggle="modal"
						data-target="#shop-map">${shop.address}</div>
					<div class="ms-5">${shop.phone}</div>
				</div>
			</div>`);
			/*let mapContainer = $('#map-shop-'+shop.cif);
			mapContainer.css({
				height: '200px',
				border: '2px solid #faa541'
			});

			//Cargando el mapa
			let map = L.map('map-shop'+shop.cif);
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			}).addTo(map);

			let mapShop = L.marker([shop.coords.latitude, shop.coords.longitude]).addTo(map);
			mapShop.bindPopup(shop.name);

			map.on('click', function (event) {
				L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
			});
			map.on('contextmenu', function (event) {
				marker.setLatLng([event.latlng.lat, event.latlng.lng]);
			});*/
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
		if (link.length === 1) {
			container = link.next();
			container.children().remove();
			link.parent().append(container);
		} else {
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
		$('#mapid').css('display', 'none');
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
						<div>	
						</div>
						<a id="comprar" data-serial="${product.serialNumber}" class="btn btn-primary">
							<i class="icon-plus"></i>&nbsp;Comprar 
						</a><br><br>
						<a id="newFav" data-serial="${product.serialNumber}" value="${product.serialNumber}" 
							class="btn btn-primary"><i class="icon-star"></i>
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
		if (link.length === 1) {
			container = link.next();
			container.children().remove();
			link.parent().append(container);
		} else {
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
		$('#mapid').css('display', 'none');
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
						</a><br><br>
						<a id="newFav" value="${product.serialNumber}" class="btn btn-primary">
							<i class="icon-star"></i> 
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
		$('#mapid').css('display', 'none');
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
						</a><br><br>
						<a id="newFav" value="${product.serialNumber}" class="btn btn-primary">
							<i class="icon-star"></i> 
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
			this.shopping.css("width", "50%");
		});
	}

	/* Administración */

	bindAdminMenu(hNewShop, hRemoveShop, hNewCategory, hRemoveCategory, hNewProduct, hRemoveProduct, hRemoveProductShop, hAddStockProductInShop) {
		$('#lnewShop').click((event) => {
			this.#excecuteHandler(hNewShop, [], '#new-shop', { action: 'newShop' }, '#', event);
		});
		$('#ldelShop').click((event) => {
			this.#excecuteHandler(hRemoveShop, [], '#remove-shop', { action: 'removeShop' }, '#', event);
		});
		$('#lnewCategory').click((event) => {
			this.#excecuteHandler(hNewCategory, [], '#new-category', { action: 'newCategory' }, '#', event);
		});
		$('#ldelCategory').click((event) => {
			this.#excecuteHandler(hRemoveCategory, [], '#remove-category', { action: 'removeCategory' }, '#', event);
		});
		$('#lnewProduct').click((event) => {
			this.#excecuteHandler(hNewProduct, [], '#new-product', { action: 'newProduct' }, '#', event);
		});
		$('#ldelProduct').click((event) => {
			this.#excecuteHandler(hRemoveProduct, [], '#remove-product', { action: 'removeProduct' }, '#', event);
		});
		$('#ldelProductShop').click((event) => {
			this.#excecuteHandler(hRemoveProductShop, [], '#remove-product-shop', { action: 'removeProductShop' }, '#', event);
		});
		$('#laddStock').click((event) => {
			this.#excecuteHandler(hAddStockProductInShop, [], '#add-stock-product-shop', { action: 'addStrockProductInShop' }, '#', event);
		});
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

	bindNewShopForm(handler) { //Validación de la nueva Tienda
		newShopValidation(handler);
	}

	showNewShopModal(done, shop, error) {//creación del modal para comprobar si se ha añadido correctamente o no
		$("#new-shop").modal('hide'); //Cerrar el otro modal para que no haya conflicto
		$(document.fNewShop).find('div.error').remove();
		if (done) {
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

	showRemoveShopForm(shops) {
		let link = $('#selectRemoveShop');
		if (link.length === 1) {
			$('#selectRemoveShop').remove();
			$('#selectRemoveShopI').remove();
		}
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

		let select = $(`
				<div class="input-group-prepend" id="selectRemoveShopI">
					<span class="input-group-text" id="titlePrepend"><i class="icon-group"></i></span>
				</div>
				<select class="form-control" id="selectRemoveShop" name="selectRemoveShop"> required>			
				</select>`);
		$('#colRemShop').append(select);

		for (let shop of shops) {
			let option = $(`<option value="${shop.cif}">${shop.name}</option>`);
			$('#selectRemoveShop').append(option);
		}
	}

	bindRemoveShopForm(handler) {
		removeShopValidation(handler);
	}

	showRemoveShopModal(done, shop, position, error) {
		$('#remove-shop').modal('hide');
		$('remove-shop').find('div.error').remove();
		if (done) {
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

	bindNewCategoryForm(handler) { //Validación de la nueva categoria
		newCategoryValidation(handler);
	}

	showNewCategoryModal(done, cat, error) {//creación del modal para comprobar si se ha añadido correctamente o no
		$("#new-category").modal('hide'); //Cerrar el otro modal para que no haya conflicto
		$(document.fNewCategory).find('div.error').remove();
		if (done) {
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

	showRemoveCategoryForm(categories) {
		let link = $('#selectRemoveCategory');
		if (link.length === 1) {
			$('#selectRemoveCategory').remove();
			$('#selectRemoveCategoryI').remove();
		}
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


		let select = $(`
			<div class="input-group-prepend" id="selectRemoveCategoryI">
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

	bindRemoveCategoryForm(handler) {
		removeCategoryValidation(handler);
	}

	showRemoveCategoryModal(done, cat, position, error) {
		$('#remove-category').modal('hide');
		$('remove-category').find('div.error').remove();
		if (done) {
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

	showNewProductForm(categories) {
		let container = $(`		
		<div class="modal fade" id="new-product" data-backdrop="static" data-keyboard="false" tabindex="1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-body" id="new-product">Añadir nuevo Producto</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="text-body h3" aria-hidden="true">&times;</span>
                                </button>
                            </div>
							<form name="fNewProduct" role="form" method="post" novalidate enctype="multipart/form-data">
								<div class="modal-body text-body">
									<div class="form-row">
										<div class="col-md-6 mb-3">
											<label for="serialNumber">Número de serie *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="serialNumber"><i class="icon-key"></i></span>
												</div>
												<input type="number" class="form-control" id="serialNumber" name="serialNumber" placeholder="Número de serie"
													aria-describedby="serialNumber" value="" required>
												<div class="invalid-feedback">El número de serie es obligatorio.</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3">
											<label for="nameProd">Nombre *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="nameProd"><i class="icon-group"></i></span>
												</div>
												<input type="text" class="form-control" id="nameProd" name="nameProd" placeholder="Nombre del producto"
													aria-describedby="nameProd" value="" required>
												<div class="invalid-feedback">El nombre es obligatorio.</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-5 mb-3">
											<label for="priceProduct">Precio *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="priceProduct"><i class="icon-eur"></i></span>
												</div>
												<input type="number" class="form-control" id="priceProduct" name="priceProduct"
													aria-describedby="priceProduct" value="" required placeholder="Precio producto">
												<div class="invalid-feedback">La precio es obligatorio</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
										<div class="col-md-3 mb-3">
											<label for="taxProduct">Impuesto *</label>
											<div class="input-group">
											<div class="input-group-prepend">
												<span class="input-group-text" id="taxProduct"><i class="icon-sort-by-order"></i></span>
											</div>
											<input type="number" class="form-control" id="taxProduct" name="taxProduct"
												aria-describedby="taxProduct" value="21" size="2" readonly="reandonly">
											</div>
										</div>
										<div class="col-md-4 mb-3">
										<label for="selectTypeProduct">Tipo de Producto *</label>
										<select class="form-control" id="selectTypeProduct" name="selectTypeProduct"> required>
											<option value="traje">Traje</option>
											<option value="bota">Bota</option>
											<option value="pantalon">Pantalón</option>
											<option value="calcetin">Calcetín</option>
										</select>
									</div>
									</div>
									<div class="form-row">
										<div class="col-md-12 mb-3">
											<label for="desProduct">Descripción *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="desProduct"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="desProduct" name="desProduct" placeholder="Descripción del producto"
													aria-describedby="desProduct" value="" required>
												<div class="invalid-feedback">La descripción es obligatoria.</div>
												<div class="valid-feedback">Correctas.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-12 mb-3">
											<label for="imageProduct">Ruta del fichero img *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="imageProduct"><i class="icon-file"></i></span>
												</div>
												<input type="text" class="form-control" id="imageProduct" name="imageProduct"
													aria-describedby="imageProduct" placeholder="Ruta de donde se encuentra la imagen" required>
												<div class="invalid-feedback">Debe seleccionar un archivo con extensión png.</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<label for="categoryNewProduct">Categorías asociadas *</label>
										<div class="col-md-12 mb-3" id="categoryNewProduct">

										</div>
									</div>
									<hr>
									<div class="form-row">
										<h5 class="text-center" id="productTraje">Especificaciones del Traje </h5>
										<h5 class="text-center" id="productBota4">Especificaciones de la Bota </h5>
										<h5 class="text-center" id="productPantalon">Especificaciones del Pantalón </h5>
										<h5 class="text-center" id="productCalcetin">Especificaciones del Calcetin </h5>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3" id="productTraje2">
											<label for="alturaTraje">Altura *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="alturaTraje"><i class="icon-sort-by-order"></i></span>
												</div>
												<input type="number" class="form-control" id="alturaTraje" name="alturaTraje"
													aria-describedby="alturaTraje" placeholder="Altura" required>
												<div class="invalid-feedback">Debe introducir una altura.</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3" id="productTraje3">
											<label for="cierreTraje">Cierre *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="cierreTraje"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="cierreTraje" name="cierreTraje"
													aria-describedby="cierreTraje" placeholder="Cierre" required>
												<div class="invalid-feedback">El cierre es obligatorio</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3" id="productTraje4">
											<label for="cuidadosTraje">Cuidados *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="cuidadosTraje"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="cuidadosTraje" name="cuidadosTraje"
													aria-describedby="cuidadosTraje" placeholder="Cuidados" required>
												<div class="invalid-feedback">Los cuidados son obligatorios</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3" id="productTraje5">
										<label for="detallesTraje">Detalles *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="detallesTraje"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="detallesTraje" name="detallesTraje"
													aria-describedby="detallesTraje" placeholder="Detalles del traje" required>
												<div class="invalid-feedback">Los detalles son obligatorios</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3" id="productBota">
											<label for="tallaBota">Talla *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="tallaBota"><i class="icon-sort-by-order"></i></span>
												</div>
												<input type="number" class="form-control" id="tallaBota" name="tallaBota"
													aria-describedby="tallaBota" placeholder="Talla" required>
												<div class="invalid-feedback">Debe introducir una talla.</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3" id="productBota1">
											<label for="cierreBota">Cierre *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="cierreBota"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="cierreBota" name="cierreBota"
													aria-describedby="cierreBota" placeholder="Cierre" required>
												<div class="invalid-feedback">El cierre es obligatorio</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3" id="productBota2">
											<label for="suelaBota">Suela *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="suelaBota"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="suelaBota" name="suelaBota"
													aria-describedby="suelaBota" placeholder="Suela" required>
												<div class="invalid-feedback">La suela es obligatoria</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3"  id="productBota3">
										<label for="plantillaBota">Plantilla *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="plantillaBota"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="plantillaBota" name="plantillaBota"
													aria-describedby="plantillaBota" placeholder="Plantilla" required>
												<div class="invalid-feedback">La plantilla es obligatoria</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3" id="productPantalon1">
											<label for="cintuPantalon">Cintura *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="cintuPantalon"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="cintuPantalon" name="cintuPantalon"
													aria-describedby="cintuPantalon" placeholder="Cintura" required>
												<div class="invalid-feedback">Debe introducir una cintura.</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3" id="productPantalon2">
											<label for="cierrePantalon">Cierre *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="cierrePantalon"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="cierrePantalon" name="cierrePantalon"
													aria-describedby="cierrePantalon" placeholder="Cierre" required>
												<div class="invalid-feedback">El cierre es obligatorio</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3" id="productPantalon3">
											<label for="bolsilloPantalon">Bolsillos *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="bolsilloPantalon"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="bolsilloPantalon" name="bolsilloPantalon"
													aria-describedby="bolsilloPantalon" placeholder="Bolsillos" required>
												<div class="invalid-feedback">Los bolsillos son obligatorio</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3" id="productPantalon4">
											<label for="materialPantalon">Material *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="materialPantalon"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="materialPantalon" name="materialPantalon"
													aria-describedby="materialPantalon" placeholder="Material" required>
												<div class="invalid-feedback">El material es obligatorio</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3" id="productCalcetin1">
											<label for="diseCalcetin">Diseño *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="diseCalcetin"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="diseCalcetin" name="diseCalcetin"
													aria-describedby="diseCalcetin" placeholder="Diseño" required>
												<div class="invalid-feedback">Debe introducir un tipo de Diseño.</div>
												<div class="valid-feedback">Correcta.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3" id="productCalcetin2">
											<label for="tipoPantalon">Tipo *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="tipoPantalon"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="tipoPantalon" name="tipoPantalon"
													aria-describedby="tipoPantalon" placeholder="Tipo" required>
												<div class="invalid-feedback">El tipo es obligatorio</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6 mb-3" id="productCalcetin3">
											<label for="materialCalcetin">Material *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="materialCalcetin"><i class="icon-align-justify"></i></span>
												</div>
												<input type="text" class="form-control" id="materialCalcetin" name="materialCalcetin"
													aria-describedby="materialCalcetin" placeholder="Material" required>
												<div class="invalid-feedback">Los bolsillos son obligatorio</div>
												<div class="valid-feedback">Correcto.</div>
											</div>
										</div>
										<div class="col-md-6 mb-3" id="productCalcetin4">
											<label for="packCalcetin">Pack *</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<span class="input-group-text" id="packCalcetin"><i class="icon-sort-by-order"></i></span>
												</div>
												<input type="number" class="form-control" id="packCalcetin" name="packCalcetin"
													aria-describedby="packCalcetin" min="1" placeholder="Material" required>
												<div class="invalid-feedback">El material es obligatorio</div>
												<div class="valid-feedback">Correcto.</div>
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
		$('body').append(container);

		let link = $('#categoryNewProduct > input');
		if (link.length >= 1) {
			$('#categoryNewProduct > input').remove();
			$('#categoryNewProduct > label').remove();
		}

		for (let category of categories) {
			let div = (`
				<input type="checkbox" name="checkCategory" value="${category.title}">
				<label for="check-${category.title}">${category.title}&nbsp;&nbsp;</label>
			`);
			$('#categoryNewProduct').append(div);
		}
		$('#categoryNewProduct').append(`<p class="text-danger" id="categoryNewProductP">Al menos debe seleccionar alguna categoria</p>`);
		ocultForm(); //Al principio no muestra ningun campo, excepto del traje
	}

	bindNewProductForm(handler) {
		newProductValidation(handler);
	}

	showNewProductModal(done, product, position, error) {
		$('#new-product').modal('hide');
		$('new-product').find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newProductModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="newProductModalLabel">Producto añadido</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-body">
							EL producto <strong>${product.name}</strong> ha sido añadido correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let newProductModal = $('#newProductModal');
			newProductModal.modal('show');
			newProductModal.find('button').click(() => {
				/*newProductModal.on('hidden.bs.modal', function (event) {
					document.fNewProduct.serialNumber.focus();
					this.remove();
				});*/
				newProductModal.modal('hide');
			})
		} else {
			$('#newProductModal').prepend(`<div class="error text-danger p-3"><i class="icon-exclamation-sign"></i> El producto <strong>${product.name}</strong> no exite en el Almacen.</div>`);
		}
	}

	showRemoveProductForm() {
		$('#remove-product').modal('hide');
		let container = $(`		
			<div class="modal fade" id="remove-product" data-backdrop="static" data-keyboard="false" tabindex="1"
				aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="remove-product">Borrar uno u varios Productos</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span class="text-body h3" aria-hidden="true">&times;</span>
							</button>
						</div>
							<form name="fRemProduct" role="form" method="post" novalidate>
								<div class="modal-body text-body text-justify">
									<div class="form-row">
										<div class="col-md-12 mb-3 text-center">
											<label for="selectTypeRemProduct">Tipo de Producto *</label>
											<select class="form-control text-center" id="selectTypeRemProduct" name="selectTypeRemProduct"> required>
												<option value="Traje">Traje</option>
												<option value="Bota">Bota</option>
												<option value="Pantalon">Pantalón</option>
												<option value="Calcetin">Calcetín</option>
											</select>
										</div>
									</div>
								</div>
								<button class="btn btn-primary" type="submit">Mostrar los productos</button>							
							</form>
							<form name="fRemTypeProduct" role="form" method="post" novalidate id="fRemTypeProduct">

							</form>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							</div>
						</div>
					</div>
				</div>
			</div>`);
		$('body').append(container);
		$('#fRemTypeProduct').css('display', 'none');
		//('#typeRem').css('display', 'none');
	}

	bindSelectTypeForm(handler) {
		selectTypeValidation(handler);
	}

	showRemoveTypeProductForm(products) {
		//$('#divType').remove();
		$('#removeTypeProduct').remove();
		let div = $(`
			<div class="modal-body text-body text-justify" id="removeTypeProduct">
				<div class="form-row">
					<label for="typeRemProduct">Selecciona algún producto *</label>
					<div class="col-md-12 mb-3" id="typeRemProduct">

					</div>
					<button class="btn btn-primary" type="submit" id="typeRem">Eliminar</button>
				</div>
			</div>
		`);
		$('#fRemTypeProduct').append(div);

		let br = 0;
		for (let product of products) {
			let check = (`
				<input type="checkbox" name="checkTypeProduct" value="${product.serialNumber}">
				<label for="check-${product.serialNumber}">${product.name}&nbsp;&nbsp;</label>
			`);
			$('#typeRemProduct').append(check);
			if (br % 2 === 0) $('#typeRemProduct').append(`<br>`);
			br++;
		}
		$('#typeRemProduct').append(`<p class="text-danger" id="categoryRemTypeProductP">Al menos debe seleccionar algún producto</p>`);
		$('#fRemTypeProduct').css('display', 'block');
	}

	bindRemoveProductTypeForm(handler) {
		removeProductTypeForm(handler);
	}

	showRemoveProductModal(done, products, position, error) {
		$('#remove-product').modal('hide');
		$('remove-product').find('div.error').remove();
		$('#delProductModalP').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="delProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="delProductModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="delProductModalLabel">Producto añadido</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-body" id="delProductModalDiv">

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			if (products.length === 1) {
				$('#delProductModalDiv').append(`<p id="delProductModalP">El producto ${products[0].name} ha sido eliminado correctamente`);
			} else {
				$('#delProductModalDiv').append(`<p id="delProductModalP">Los productos: <p>`);
				for (let product of products) {
					//let div = $(`${product.name}`);
					$('#delProductModalP').append(`<span>${product.name},</span>`);
				}
				$('#delProductModalP').append(` han sido eliminado correctamente.`);
			}


			let delProductModal = $('#delProductModal');
			delProductModal.modal('show');
			delProductModal.find('button').click(() => {
				/*newProductModal.on('hidden.bs.modal', function (event) {
					document.fNewProduct.serialNumber.focus();
					this.remove();
				});*/
				delProductModal.modal('hide');
			});

		} else {
			let product = products[0];
			$('#delProductModal').prepend(`<div class="error text-danger p-3"><i class="icon-exclamation-sign"></i> El producto <strong>${product.name}</strong> no ha sido eliminido.</div>`);
		}
	}

	showRemoveProShopForm(shops) {
		let link = $('#selectRemoveProductShop');
		if (link.length === 1) {
			$('#selectRemoveProductShop').remove();
			$('#selectRemoveProductShopI').remove();
		}

		let container = $(`		
			<div class="modal fade" id="remove-product-shop" data-backdrop="static" data-keyboard="false" tabindex="1"
						aria-labelledby="staticBackdropLabel" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title text-body" id="remove-product-shop">Borrar productos de una Tienda</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span class="text-body h3" aria-hidden="true">&times;</span>
									</button>
								</div>
								<form class="text-center" name="fRemProductShop" role="form" method="post" novalidate>
									<div class="modal-body text-body text-justify">
										<div class="form-row">
											<div class="col-md-12 mb-3">
												<label for="ncShop">Tiendas *</label>
												<div class="input-group" id="colRemProductShop">
													<div class="valid-feedback">Correcta.</div>
												</div>
											</div>
										</div>
									</div>
									<button class="btn btn-primary" type="submit">Mostrar los productos</button>
								</form>
								<form name="fRemProductInShop" role="form" method="post" novalidate id="fRemProductInShop">

								</form>					
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								</div>
							</div>
						</div>
					</div>`);
		$('body').append(container);

		let select = $(`
				<div class="input-group-prepend" id="selectRemoveProductShopI">
					<span class="input-group-text" id="titlePrepend"><i class="icon-group"></i></span>
				</div>
				<select class="form-control" id="selectRemoveProductShop" name="selectRemoveProductShop"> required>			
				</select>`);
		$('#colRemProductShop').append(select);

		for (let shop of shops) {
			let option = $(`<option value="${shop.cif}">${shop.name}</option>`);
			$('#selectRemoveProductShop').append(option);
		}
	}

	bindSelectProductShopForm(handler) {
		removeProductShopValidation(handler);
	}

	showRemoveProductShopForm(products) {
		$('#typeRemProductShopDiv').remove();
		$('#typeRemProductShopL').remove();
		let div = $(`
			<div class="modal-body text-body text-justify"  id="typeRemProductShopDiv">
				<div class="form-row">
					<label for="typeRemProductShop" id="typeRemProductShopL">Selecciona algún producto *</label>
					<div class="col-md-12 mb-3" id="typeRemProductShop">

					</div>
					<button class="btn btn-primary" type="submit" id="typeRemProductShopB">Eliminar</button>
				</div>
			</div>
		`);
		$('#fRemProductInShop').append(div);

		let br = 0;

		for (let product of products) {
			let check = (`
					<input type="checkbox" name="checkProductShop" value="${product.serialNumber}">
					<label for="check-${product.serialNumber}">${product.name}&nbsp;&nbsp;</label>
				`);
			$('#typeRemProductShop').append(check);
			if (br % 2 === 0) $('#typeRemProductShop').append(`<br>`);
			br++;
		}
		$('#typeRemProductShop').append(`<p class="text-danger" id="typeRemProductShopP">Al menos debe seleccionar algún producto</p>`);
		$('#typeRemProductShopP').css('display', 'block');
	}

	bindRemoveProductShopForm(handler) {
		removeProductShopForm(handler);
	}

	showRemoveProductShopModal(done, products, shop, error) {
		$('#typeRemProductShopDiv').remove();
		$('#remove-product-shop').modal('hide');
		$('remove-product-shop').find('div.error').remove();
		$('#delProductShopModalDivP').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="delProductShopModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="delProductShopModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="delProductShopModalLabel">Producto/s borrado/s de la tienda ${shop.name}</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-body" id="delProductShopModalDiv">

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			if (products.length === 1) {
				$('#delProductShopModalDiv').append(`<p id="delProductShopModalDivP">El producto ${products[0].name} ha sido eliminado correctamente`);
			} else {
				$('#delProductShopModalDiv').append(`<p id="delProductShopModalDivP">Los productos: <p>`);
				for (let product of products) {
					//let div = $(`${product.name}`);
					$('#delProductShopModalDivP').append(`<span>${product.name}, </span>`);
				}
				$('#delProductShopModalDivP').append(` han sido eliminado correctamente.`);
			}

			let delProductShopModalDiv = $('#delProductShopModal');
			delProductShopModalDiv.modal('show');
			delProductShopModalDiv.find('button').click(() => {
				delProductShopModalDiv.modal('hide');
			});

		} else {
			let product = products[0];
			$('#delProductShopModalDiv').prepend(`<div class="error text-danger p-3"><i class="icon-exclamation-sign"></i> El producto <strong>${product.name}</strong> no ha sido eliminido.</div>`);
		}
	}

	showAddStockProShopForm(shops) {
		let link = $('#colAddStockProShop');
		if (link.length === 1) {
			$('#selectAddStockProShop').remove();
			$('#selectAddStockProShopI').remove();
			$('#addStockProInShopDiv2').remove();
		}
		let container = $(`		
			<div class="modal fade" id="stock-product-shop" data-backdrop="static" data-keyboard="false" tabindex="1"
						aria-labelledby="staticBackdropLabel" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title text-body" id="stock-product-shop">Añadir stock de un producto a una Tienda</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span class="text-body h3" aria-hidden="true">&times;</span>
									</button>
								</div>
								<form class="text-center" name="fAddStockProShop" role="form" method="post" novalidate>
									<div class="modal-body text-body text-justify">
										<div class="form-row">
											<div class="col-md-12 mb-3">
												<label for="ncShop">Tiendas *</label>
												<div class="input-group" id="colAddStockProShop">
													<div class="valid-feedback">Correcta.</div>
												</div>
											</div>
										</div>
									</div>
									<button class="btn btn-primary" type="submit">Mostrar los productos</button>
								</form>
								<form name="fAddStockProInShop" role="form" method="post" novalidate id="fAddStockProInShop">

								</form>					
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								</div>
							</div>
						</div>
					</div>`);
		$('body').append(container);

		let select = $(`
				<div class="input-group-prepend" id="selectAddStockProShopI">
					<span class="input-group-text" id="titlePrepend"><i class="icon-group"></i></span>
				</div>
				<select class="form-control" id="selectAddStockProShop" name="selectAddStockProShop"> required>			
				</select>`);
		$('#colAddStockProShop').append(select);

		for (let shop of shops) {
			let option = $(`<option value="${shop.cif}">${shop.name}</option>`);
			$('#selectAddStockProShop').append(option);
		}
	}

	bindSelectShopStockForm(handler) {
		selectProductShopFormValidation(handler);
	}

	showAddStockProShopForm2(products) {
		$('#addStockProInShopDiv2').remove();
		let div = $(`
			<div class="modal-body text-body text-justify" id="addStockProInShopDiv2">
				<div class="form-row">
					<div class="col-md-12 mb-3">
						<label for="typeRemProductShop">Selecciona algún producto *</label>
						<div class="input-group" id="addStockProInShopDiv">
							<div class="valid-feedback">Correcta.</div>
						</div>
					</div>
					<div class="col-md-12 mb-3">
						<label for="addStockProductShop">Introduzca el stock que sea añadir*</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="stockProduct"><i class="icon-ok-sign"></i></span>
							</div>
							<input type="number" class="form-control" id="stockProduct" name="stockProduct" placeholder="Número de stock"
								aria-describedby="stockProduct" value="" required>
								<div class="invalid-feedback">El stock debe ser mayor que 0.</div>
								<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<button class="btn btn-primary" type="submit" id="typeRem">Añadir stock</button>
				</div>
			</div>
		`);
		$('#fAddStockProInShop').append(div);

		let select = $(`
			<div class="input-group-prepend" id="selectAddStockProShop2I">
				<span class="input-group-text" id="titlePrepend"><i class="icon-adn"></i></span>
			</div>
			<select class="form-control" id="selectAddStockProShop2" name="selectAddStockProShop2"> required>			
			</select>
		`);
		$('#addStockProInShopDiv').append(select);

		for (let product of products) {
			let option = $(`<option value="${product.serialNumber}">${product.name}</option>`);
			$('#selectAddStockProShop2').append(option);
		}
	}

	bindSelectProdStockForm(handler) {
		selectProductShopForm2Validation(handler);
	}

	showAddStockProShopModal(done, product, stock, shop, error) {
		//$('#typeRemProductShopDiv').remove();
		$('#stock-product-shop').modal('hide');
		$('stock-product-shop').find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="stockProductShopModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="stockProductShopModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-body" id="stockProductShopModalLabel">El stock ha sido añadido correctamente a la tienda ${shop.name}</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-body">
							<p>El producto <strong>${product.name}</strong> ya contiene <strong>${stock}</strong> unidades.</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);

			let stockProductShopModal = $('#stockProductShopModal');
			stockProductShopModal.modal('show');
			stockProductShopModal.find('button').click(() => {
				stockProductShopModal.modal('hide');
			});

		} else {
			let product = products[0];
			$('#stockProductShopModal').prepend(`<div class="error text-danger p-3"><i class="icon-exclamation-sign"></i> El producto <strong>${product.name}</strong> no se la ha podido asignar el stock.</div>`);
		}
	}

	showLocationStores() {
		$('#map-stores').click((event) => {
			let main = $('main');
			//Contenedor del mapa
			main.append($('<div class="container"><div class="m-4" id="mapid"></div></div>'));
			let mapContainer = $('#mapid');
			mapContainer.css({
				height: '350px',
				border: '2px solid #faa541'
			});

			//Cargando el mapa
			let map = L.map('mapid')
				.setView([38.999532, -3.921055], 15);
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
				maxZoom: 18
			}).addTo(map);

			for (let store of this.storeHouse.getShops()) {
				let shop = L.marker([store.coords.latitude, store.coords.longitude]).addTo(map);
				shop.bindPopup(store.name);
				console.log(store.name);
			}

			let marker = L.marker([38.999532, -3.921055]).addTo(map);
			marker.bindPopup('<strong>Almacen</strong>').openPopup();

			map.on('click', function (event) {
				L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
			});
			map.on('contextmenu', function (event) {
				marker.setLatLng([event.latlng.lat, event.latlng.lng]);
			});
		});
	}

	showLogin(){
		$('#mapid').css('display', 'none');
		let container = $(`
			<div class="container w-50">
				<div class="justify-content-center">
					<div class="user_card">
						<h5 class="text-center">Iniciar Sesión</h5>
						<div class="justify-content-center form_container">
							<form name="fLogin" role="form" novalidate>
								<div class="form-row">
									<div class="col-md-12 mb-3">
										<label for="nameIniSesion">Usuario *</label>
										<div class="input-group">
											<div class="input-group-prepend">
												<span class="input-group-text" id="nameIniSesionI"><i class="icon-user"></i></span>
											</div>
											<input type="text" class="form-control" id="nameIniSesion" name="nameIniSesion" placeholder="Usuario"
												aria-describedby="nameIniSesion" value="" required>
											<div class="invalid-feedback">El Usuario es obligatorio.</div>
											<div class="valid-feedback">Correcto.</div>
											<br><p class="invalid-user text-danger">El usuario no es válido.</p>
										</div>
									</div>
								</div>
								<div class="form-row">
									<div class="col-md-12 mb-3">
										<label for="passIniSesion">Contrase&ntilde;a *</label>
										<div class="input-group">
											<div class="input-group-prepend">
												<span class="input-group-text" id="passwordI"><i class="icon-key"></i></span>
											</div>
											<input type="password" class="form-control" id="passIniSesion" name="passIniSesion"
												aria-describedby="passIniSesion" value="" placeholder="Contraseña" required>
											<div class="invalid-feedback">La contrase&ntilde;a es obligatoria.</div>
											<div class="valid-feedback">Correcta.</div>
											<br><p class="invalid-password text-danger">La contrase&ntilde;a es incorrecta.</p>
										</div>
									</div>
								</div>
								<div class="form-row">
									<div class="col-md-12 mb-3">
										<div class="custom-control custom-checkbox">
											<input name="remember" type="checkbox" class="custom-control-input" id="customControlInline">
											<label class="custom-control-label" for="customControlInline">Recuerdame</label>
										</div>
									</div>
								</div>
								<div class="form-row justify-content-center">
									<div class="col-auto text-center">
										<button class="btn btn-primary" type="submit">Iniciar Sesi&oacute;n</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div><br><br>
		`);
		this.main.prepend(container);
		$('.invalid-password').css('display', 'none');
		$('.invalid-user').css('display', 'none');
	}

	bindLogin(handler){
		logInFormValidation(handler);
	}

	showAuthUserProfile(user){
		let userArea = $('#userArea');
		userArea.empty();
		userArea.append(`<a role="button" class="nav-link active" id="aCloseSession">
							<i class="icon-signout"></i>&nbsp;Cerrar Sesi&oacute;n</a>`);
	}

	showValidUserMessage(user) {
		let modal = $(`<div class="modal fade" id="authUserMessageModal" tabindex="-1"
			data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="authUserMessageModal" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content text-body">
					<div class="modal-header">
						<h3 class="modal-title text-center" id="newCategoryModalLabel"> <strong>¡Bienvenido ${user.username}!</strong></h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						¡Bienvenido <strong>${user.username}</strong> a la administraci&oacute;n de la página!
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
					</div>
				</div>
			</div>
		</div>`);
		$('body').append(modal);
		let authUserMessageModal = $('#authUserMessageModal');
		authUserMessageModal.modal('show');
		authUserMessageModal.find('button').click(() => {
			authUserMessageModal.on('hidden.bs.modal', function (event) {
				this.remove();
			});
			authUserMessageModal.modal('hide');
		})
	}

	initHistory(){
		history.replaceState({action: 'init'}, null);
	}

	setUserCookie(user){
		setCookie('userAdmin',user.username,1);
	}

	deleteUserCookie(){
		setCookie('userAdmin','',0);
	}

	bindCloseSession(handler){
		$('#aCloseSession').click((event) => {
			handler();
			event.preventDefault();
		})
	}

	showAdminMenu(){
		$('#administration').css('display', 'block');
		$('#profile').css('display', 'block');
    	$('#carrito').css('display', 'block');
		$('#favoritos').css('display', 'block');
	}

	removeAdminMenu(){
		$('#administration').css('display', 'none');
		$('#profile').css('display', 'none');
    	$('#carrito').css('display', 'none');
		$('#favoritos').css('display', 'none');
	}

	showIdentificationLink(){
		let userArea = $('#userArea');
		userArea.empty();
		userArea.append(`<a role="button" class="nav-link active" id="login"><i class="icon-signin"></i>&nbsp;Iniciar Sesi&oacute;n</a>`);
	}

	bindIdentificationLink(handler){
		$('#login').click((event) => {
			this.#excecuteHandler(handler, [], 'main', {action: 'login'}, '#', event);
		});
	}

	showBackupModal(){
		$('#lbackup').click((event) => {
			let modal = $(`<div class="modal fade" id="create-backup" tabindex="-1"
			data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="create-backupModal" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content text-body">
					<div class="modal-header">
						<h3 class="modal-title text-center" id="create-backupLabel"><strong>Grabado de datos</strong></h3>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form method="post" action="./grabado-datos.php" name="fBackUp" role="form">
						<div class="modal-body">
							<div class="form-row justify-content-center">
							<div class="col-auto text-center">
								<input type="hidden" id="backup" value="" name="backup">
								<button class="btn btn-primary" type="submit" name="grabar">Grabar</button>
							</div>
						</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
						</div>
					</form>
				</div>
			</div>
		</div>`);
		$('body').append(modal);
		let backup = $('#create-backup');
		backup.modal('show');
		backup.find('button').click(() => {
			backup.on('hidden.bs.modal', function (event) {
				this.remove();
			});
			backup.modal('hide');
		})
		});

	}

	showDataStoreHouse(string){
		$('#backup').val(string);
	}

	bindFavs(handler){
		this.main.on('click','#newFav', function () { //Al ser dinamico, se le introduce el on
			handler($(this).attr('value'));
		});
	}

	showFavs(products){
		$('#mapid').css('display', 'none');
		this.main.empty();
		let container = $(`<div id="products-favs" class="container">
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
						<div>	
						</div>
						<a id="comprar" data-serial="${product.serialNumber}" class="btn btn-primary">
							<i class="icon-plus"></i>&nbsp;Comprar 
						</a><br><br>
						<a id="newFav" data-serial="${product.serialNumber}" class="btn btn-primary">
							<i class="icon-star"></i> 
						</a>
					</div>
				</figure>
			</div>`);
			container.children().first().append(div);
		}
		container.prepend(`<h2 class="text-center">Productos favoritos</h2>`);
		this.main.append(container);
	}

	bindshowFavs(handler){
		$('#favoritos').click((event) => {
			handler();
		});
	}
}

export default ManagerView;