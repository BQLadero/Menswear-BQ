var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

//Lo que aparece nada más iniciar perfil.html
let datos = document.getElementById("datos");
let favoritos = document.getElementById("favoritos");
let pedidos = document.getElementById("pedidos");
datos.style.display = "none";
favoritos.style.display = "none";
pedidos.style.display = "block";

function mostPed() {
    datos.style.display = "none";
    favoritos.style.display = "none";
    pedidos.style.display = "block";
    pedidos.window.location.href = "#pedidos";
}

function mostFav() {
    datos.style.display = "none";
    favoritos.style.display = "block";
    pedidos.style.display = "none";
    favoritos.window.location.href = "#favoritos";
}

function mostDat() {
    datos.style.display = "block";
    favoritos.style.display = "none";
    pedidos.style.display = "none";
    datos.window.location.href = "#datos";
    modif.style.display = "none";
}

let confir = document.getElementById("confirmar");
let modif = document.getElementById("modificar");
//Por defecto
confir.style.display = "none";
modif.style.display = "block";

function modificar(){
    modif.style.display = "none";
    confir.style.display = "block";
}

function confirmar(){
    confir.style.display = "none";
    modif.style.display = "block";
}

function comprar(){
    document.getElementById("comprar").pedidos.window.location.href = "#";
}

function devolver(){
    document.getElementById("devolver").pedidos.window.location.href = "#";
}