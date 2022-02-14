var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
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


let mainNo = document.getElementById("main_noregis");
let espe = document.getElementById("especificaciones");
espe.style.display = "none";

function mostEspe() {
    mainNo.style.display = "none";
    espe.style.display = "block";
    window.location.href = "#especificaciones";
}
