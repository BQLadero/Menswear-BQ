var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

let main = document.getElementById("main_regis");
let mini = document.getElementById("minijuego");
let bread = document.getElementById("breadcrumb");
let espe = document.getElementById("especificaciones");
mini.style.display = "none";
espe.style.display = "none";

function mostCam() {
    main.style.display = "none";
    mini.style.display = "inline";
    espe.style.display = "none";
    bread.style.display = "none";
    window.location.href = "#minijuego";
}

function mostEspeRegis() {
    main.style.display = "none";
    mini.style.display = "none";
    espe.style.display = "block";
    window.location.href = "#especificaciones";
}
