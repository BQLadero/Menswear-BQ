import { StoreHouse } from './manager.js';

class ManagerView {

    constructor() {
        //Parametros
        this.menu = $('.navbar-nav');
        this.main = $('.cuerpo__espe');
		this.publi = $('.publicidad');
		this.breadcrumb = $('.breadcrumb');
    }

    bindInit(handler) { //Recarga la página
        $('#logo').click((event) => {
            handler();
        });
		$('#logo').click((event) => {
			handler();
		});
    }


	showShops(shops){
		this.main.empty();	
		let container = $('<div id="category-list" class="row"></div>');
		for (let shop of shops){
			container.append(`<div class="col mt-5 text-center">
				<a data-category="${shop.name}" href="#shoplist">
					<div class="cat-list-image">
						<img alt="${shop.name}" src="https://via.placeholder.com/258x172.jpg?text=${shop.name}" />
					</div>
				</a>
				<a data-category="${shop.name}" href="#shoplist">
					<div class="mlf--shops">
						<h3>${shop.name}</h3>
						<div class="ms-5">${shop.address}</div>
						<div class="ms-5">${shop.phone}</div>
					</div>
				</a>
			</div>`);
		}
		//this.breadcrumb.append('<li class="breadcrumb-item active" aria-current="page">Tiendas</li>');
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
            container.append(`<a data-category="${shop.name}" class="dropdown-item" href="#shoplist">${shop.name}</a>`);
        }
        li.append(container);
        this.menu.append(`<br><br>`);
        this.menu.append(li);
    }

    showCategoriesInMenu(categories) {
		//Con boostrap 5 no funciona, es decir, no se desplega el menu
        let li = $(`<li class="nav-item dropdown">
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
        this.menu.append(`<br><br>`);
        this.menu.append(li);
    }

	listShopProducts(products, shop){
		this.main.empty();
		let container = $(`<div id="product-list" class="container">
								<div class="row"> </div>
							</div>`);
		for (let product of products){
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
		this.breadcrumb.append('<li class="breadcrumb-item active" aria-current="page">Tiendas</li>');
		container.prepend(`<h2 class="text-center">Productos de la tienda ${shop}</h2>`);
		this.main.append(container);
	}

	listProducts(products, title){
		this.main.empty();
		let container = $(`<div id="product-list" class="container my-3 w-100">
								<div class="row"> </div>
							</div>`);
		for (let product of products){
			let div = $(`
			<div class="col"">
				<figure class="card card-product-grid card-lg"> 
					<a data-serial="${product.serialNumber}" href="#single-product" class="img-wrap text-center">
                        <img class="w-75" src="${product.images2}">
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
		container.prepend(`<h2 class="text-center">Productos de ${title}</h2>`);
		this.main.append(container);
	}

	listTypeProducts(products, type){
		this.main.empty();
		let container = $(`<div id="product-list" class="container my-3 w-100">
								<div class="row"> </div>
							</div>`);
		for (let product of products){
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
		container.prepend(`<h2 class="text-center">Productos de ${type}</h2>`);
		this.main.append(container);
	}

	bindProductsCategoryList(handler){
		$('#navCats').next().children().click(function(event){
			handler(this.dataset.category);
		});

	}

	bindShopProductsList(handler){
		$('#category-list').find('a').click(function(event){
			console.log(this.dataset.category);
			handler(this.dataset.category);
		});
		$('#navShops').next().children().click(function(event){
			handler(this.dataset.category);
		});
	}

	bindTypeProductsList(handler){
		$('#type-product').next().children().click(function(event){
			console.log(this.dataset.category);
			handler(this.dataset.category);
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
											<button data-serial="${product.serial}" class="btn btn-primary text-uppercase mr-2 px-4">
												Comprar
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

    bindShowProduct(handler){
		$('#product-list').find('a.img-wrap').click(function(event){
			handler(this.dataset);
		});
		$('#product-list').find('figcaption a').click(function(event){
			handler(this.dataset);
		});
	}
}

export default ManagerView;