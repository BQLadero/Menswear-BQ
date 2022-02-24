$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});

//Referencia a los elementos
let dialog = document.getElementsByTagName("dialog")[0];
let dialog2 = document.getElementsByTagName("dialog")[1];

function showDialog() {
    dialog.show();
}

//Oculta el dialog invocando a la función close()
function closeDialog() {
    dialog.close();
}

function crearCuenta() {
    dialog2.show();
}

function cerrarCuenta() {
    dialog2.close();
}

