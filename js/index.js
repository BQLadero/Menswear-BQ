$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

//Referencia a los elementos
let dialog = document.getElementsByTagName("dialog")[0];
//let dialog2 = document.getElementsByTagName("dialog")[1];

function showDialog() {
    dialog.show();
}

//Oculta el dialog invocando a la función close()
function closeDialog() {
    dialog.close();
}

/*function crearCuenta() {
    dialog2.show();
}

function cerrarCuenta() {
    dialog2.close();
}*/

let iniciar = document.getElementById("iniciar");
let crear = document.getElementById("crear");
iniciar.style.display = 'block';
crear.style.display = 'none';

function mtdIniciar() {
    iniciar.style.display = 'block';
    crear.style.display = 'none';
}

function mtdCrear() {
    iniciar.style.display = 'none';
    crear.style.display = 'block';
}