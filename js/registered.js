var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

let mini = $('#minijuego');
mini.css("display", "none");

function mostCam() {
    mini.css("display", "block");
    window.location.href = "#minijuego";
}

function ocultCam() {
    mini.css("display", "none");
}