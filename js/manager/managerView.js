import { StoreHouse } from './manager.js';

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
		console.log(product);
		let main = $(window.document).find('main');
		let header = $(window.document).find('header nav');
		let container;
		if (product) {
			window.document.title = `Especificaciones del producto: ${product.name}`;
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
											Comprar
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
		window.document.body.scrollIntoView();
	}

	constructor() {
		//Parametros
		this.menu = $('.navbar-nav');
		this.main = $('.cuerpo__espe');
		this.publi = $('.publicidad');
		this.openWindows = new Map();
		this.close = $('#close');
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
		this.main.append(`<h1 class="text-center text-white">Tiendas</h1>`);
		this.main.append(container);
	}

	showShopsInMenu(shops) {
		//Con boostrap 5 no funciona, es decir, no se desplega el menu
		let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navShops" role="button" data-toggle="dropdown" 
				aria-haspopup="true" aria-expanded="false">
				Tiendas
			</a>
		</li>`);
		let container = $('<div class="dropdown-menu" aria-labelledby="navShops"></div>');

		for (let shop of shops) {
			container.append(`<a data-category="${shop.name}" class="dropdown-item" href="#product-list">${shop.name}</a>`);
		}
		li.append(container);
		this.menu.append(`<br><br>`);
		this.menu.append(li);
	}

	bindShopProductsList(handler) {
		$('#shops-products').find('a').click((event) => {
			console.log("hola");
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
                        <img class="w-100" id="${product.serialNumber}"  src="${product.images2}">
					</a>
					<figcaption class="info-wrap mt-3">
							<a data-serial="${product.serialNumber}" href="#single-product" class="text-white h4">
								${product.name}
							</a>
					</figcaption>
					<div  class="text-center"> 
						<div> 
							<p class="price h5 text-danger">${product.price} €</p> 
							<p class="text-success">Producto rebajado de precio</p>
						</div>
						<a href="#" data-serial="${product.serialNumber}" class="btn btn-primary">
							Comprar 
						</a> 
					</div>
				</figure>
			</div>`);
			container.children().first().append(div);
		}
		//this.breadcrumb.append('<li class="breadcrumb-item active" aria-current="page">Tiendas</li>');
		container.prepend(`<h2 class="text-center">Productos de la tienda ${shop}</h2>`);
		this.main.append(container);
	}

	showCategoriesInMenu(categories) {
		//Con boostrap 5 no funciona, es decir, no se desplega el menu
		let li = $(`
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown" 
					aria-haspopup="true" aria-expanded="false">
					Categorías
				</a>
			</li>`);
		let container = $('<div class="dropdown-menu" aria-labelledby="navCats"></div>');

		for (let category of categories) {
			container.append(`<a data-category="${category.title}" class="dropdown-item" href="#productlist">${category.title}</a>`);
		}
		li.append(container);
		this.menu.append(li);
	}

	listProducts(products, title) {
		this.main.empty();
		let container = $(`<div id="product-list" class="container my-3 w-100">
								<div class="row"> </div>
							</div>`);
		for (let product of products) {
			let div = $(`
			<div class="col">
				<figure class="card card-product-grid card-lg"> 
					<a data-serial="${product.serialNumber}" href="#single-product" class="img-wrap text-center">
                        <img class="w-100" src="${product.images2}">
					</a>
					<figcaption class="info-wrap text-center">
							<a data-serial="${product.serialNumber}" href="#single-product" class="text-white h4">
								${product.name}
							</a>
					</figcaption>
					<div class="text-center"> 
						<div> 
							<p class="price h5 text-danger">${product.price} €</p> 
							<p class="text-success">Producto rebajado de precio</p>
						</div>
						<a href="#" data-serial="${product.serialNumber}" class="btn btn-primary">
							Comprar 
						</a> 
					</div>
				</figure>
			</div>`);
			container.children().first().append(div);
		}
		container.prepend(`<h2 class="text-center">Productos de ${title}</h2>`);
		this.main.append(container);
	}

	listTypeProducts(products, type) {
		this.main.empty();
		let container = $(`<div id="type-list" class="container my-3 w-100">
								<div class="row"> </div>
							</div>`);
		for (let product of products) {
			let div = $(`
			<div class="col"">
				<figure class="card text-center"> 
					<a data-serial="${product.serialNumber}" href="#single-product" class="img-wrap text-center">
                        <img class="w-100" src="${product.images2}">
					</a>
					<figcaption class="info-wrap text-center">
							<a data-serial="${product.serialNumber}" href="#single-product" class="text-white h4">
								${product.name}
							</a>
					</figcaption>
					<div  class="text-center"> 
						<div> 
							<p class="price h5 text-danger">${product.price} €</p> 
							<p class="text-success">Producto rebajado de precio</p>
						</div>
						<a href="#" data-serial="${product.serialNumber}" class="btn btn-primary">
						Comprar 
					</a> 
					</div>
				</figure>
			</div>`);
			container.children().first().append(div);
		}
		container.prepend(`<h2 class="text-center">Productos tipo ${type}</h2>`);
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

	showProduct(product, message) { //Especficaciones
		this.main.empty();
		let container;
		if (product) {
			container = $(`<div id="single-product" class="${product.constructor.name}-style container mt-5 mb-5">
				<div class="row">
					<div class="col-md-10">
						<div class="card">
							<div class="row">
								<div class="col-md-6">
									<div class="images p-3">
										<div class="text-center p-4"> <img id="main-image" src="${product.images2}"/> </div>
									</div>
								</div>
								<div class="col-md-6 text-center">
									<div class="product p-4 " id="main-image">
										<div class="mt-4 mb-3">
											<h5 class="text-uppercase">${product.name}</h5>
											<div class="text-center">
												<span class="act-price">${product.price} €</span>
											</div>
										</div>
										<div class="sizes mt-5">
											<h6 class="text-uppercase">Características</h6>
										</div>
										<p class="about">${product.description}</p>
										<div class="cart mt-4 align-items-center"> 
											<button data-serial="${product.serialNumber}" class="btn btn-primary text-uppercase mr-2 px-4">
												Comprar
											</button>
											<button id="b-open" data-serial="${product.serialNumber}" class="btn btn-primary text-uppercase mt-2 mr-2 px-4">
												Abrir en nueva ventana
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`);

			container.prepend(`<h2 class="text-center">Especificaciones del producto</h2>`);

		} else {
			container = $(` <div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
		}
		this.main.append(container);
	}

	bindShowProduct(handler) {
		$('#product-list').find('a.img-wrap').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			this.#excecuteHandler(
				handler, [serial],
				'#single-product',
				{ action: 'showProduct', serial: serial },
				'#single-product', event
			);
		});
		$('#product-list').find('figcaption a').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			this.#excecuteHandler(
				handler, [serial],
				'#single-product',
				{ action: 'showProduct', serial: serial },
				'#single-product', event
			);
		});

		$('#product-shop').find('a.img-wrap').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			this.#excecuteHandler(
				handler, [serial],
				'#single-product',
				{ action: 'showProduct', serial: serial },
				'#single-product', event
			);
		});
	}

	showProductInNewWindow(window, product, message) {
		console.log(product);
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
											Comprar
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
		$('#product-list').find('a.img-wrap').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			let product = this.storeHouse.getProduct(Number.parseInt(serial));
			console.log(product);
			if (this.openWindows.size === 0) {
				this.close.css("display", "block");
			}

			//window.open("product.html?" + event.target.dataset.serial, "ProductWindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
			if (!this.openWindows.has(serial)) {
				let productWindow = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
				productWindow.addEventListener('DOMContentLoaded', () => {
					this.#showProductInNewWindow(productWindow, product);
				});
				//this.#showProductInNewWindow(productWindow, product);
				this.openWindows.set(serial, productWindow);
				this.ventana = productWindow;
				this.close.push(productWindow);
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

		$('#shop-list').find('a.img-wrap').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			let product = this.storeHouse.getProduct(Number.parseInt(serial));
			console.log(product);
			if (this.openWindows.size === 0) {
				this.close.css("display", "block");
			}

			//window.open("product.html?" + event.target.dataset.serial, "ProductWindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
			if (!this.openWindows.has(serial)) {
				let productWindow = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
				productWindow.addEventListener('DOMContentLoaded', () => {
					this.#showProductInNewWindow(productWindow, product);
				});
				//this.#showProductInNewWindow(productWindow, product);
				this.openWindows.set(serial, productWindow);
				this.ventana = productWindow;
				this.close.push(productWindow);
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
			console.log(product);
			if (this.openWindows.size === 0) {
				this.close.css("display", "block");
			}

			//window.open("product.html?" + event.target.dataset.serial, "ProductWindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
			if (!this.openWindows.has(serial)) {
				let productWindow = window.open("product.html?" + serial, "ProductWindow" + serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar = no, menubar = no, location = no");
				productWindow.addEventListener('DOMContentLoaded', () => {
					this.#showProductInNewWindow(productWindow, product);
				});
				//this.#showProductInNewWindow(productWindow, product);
				this.openWindows.set(serial, productWindow);
				this.ventana = productWindow;
				this.close.push(productWindow);
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

	closeWindows() { //Recorrer todo el array para cerrar ventana por ventana
		$('#closeWindows').click((event) => {
			for (let [key, value] of this.openWindows) {
				value.close();
				this.openWindows.delete(key);
			}
			this.close.css("display", "none");
		});
	}
}

export default ManagerView;