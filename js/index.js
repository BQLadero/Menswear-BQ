$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

$(function () {
    $('#cerrarSesion').css('display', 'none');
    $('#profile').css('display', 'none');
    $('#carrito').css('display', 'none');
})

//Referencia a los elementos
let dialog = document.getElementsByTagName("dialog")[0];

function showDialog() {
    dialog.show();
}

//Oculta el dialog invocando a la función close()
function closeDialog() {
    dialog.close();
}

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

function barraProgress() {
    let progreso = document.getElementById("bar");
    let pixeles = 0;
    let usuario = document.getElementById("sesion__f1--usu");
    let password = document.getElementById("sesion__f1--Key");

    if (usuario.value.length > 1 && usuario.value.length < 21) {
        pixeles += 50;
        progreso.style.width = pixeles + "%";
    }
    if (password.value.length > 7 && password.value.length < 21) {
        pixeles += 50;
        progreso.style.width = pixeles + "%";
    }

    if (pixeles === 100) {
        $('#inicioSesion').css('display', 'none');
        $('#cerrarSesion').css('display', 'block');
        $('#profile').css('display', 'block');
        $('#carrito').css('display', 'block');
    }

    let form = document.forms.inicioSesion1;

    $(form).submit(function (event) {
        event.preventDefault();
        event.stopPropagation();
        closeDialog();
    });
}

function barraProgress2() {
    let progreso = document.getElementById("bar2");
    let pixeles = 0;
    let nombre = document.getElementById("sesion__f2--nom");
    let apellidos = document.getElementById("sesion__f2--ape");
    let pwd = document.getElementById("sesion__f2--pwd");
    let direccion = document.getElementById("sesion__f2--dir");
    let email = document.getElementById("sesion__f2--email");
    let tlf = document.getElementById("sesion__f2--tlf");

    if (nombre.value.length > 2 && nombre.value.length < 21) {
        pixeles += 16.666;
        progreso.style.width = pixeles + "%";
    }
    if (apellidos.value.length > 4 && apellidos.value.length < 41) {
        pixeles += 16.666;
        progreso.style.width = pixeles + "%";
    }
    if (pwd.value.length > 7 && pwd.value.length < 21) {
        pixeles += 16.666;
        progreso.style.width = pixeles + "%";
    }
    if (direccion.value.length > 9) {
        pixeles += 16.666;
        progreso.style.width = pixeles + "%";
    }

    let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (pattern.test(email.value)) {
        pixeles += 16.666;
        progreso.style.width = pixeles + "%";
    }
    if (tlf.value.length > 8 && tlf.value.length < 10) {
        pixeles += 16.666;
        progreso.style.width = pixeles + "%";
    }
}

let mini = $('#minijuego');
let main = $('#cuerpo__espe');
mini.css("display", "none");

function mostCam() {
    mini.css("display", "block");
    main.css("display", "none");
    window.location.href = "#minijuego";
}

function ocultCam() {
    mini.css("display", "none");
    main.css("display", "block");
}

function cerrarSesion() {
    $('#inicioSesion').css('display', 'block');
    $('#cerrarSesion').css('display', 'none');
    $('#profile').css('display', 'none');
    $('#carrito').css('display', 'none');
}

let shopmap = $('.almacen');
shopmap.empty();
//Contenedor del mapa
shopmap.append($('<div class="container"><div class="m-4" id="pee"></div></div>'));
let mapContainer = $('#pee');
mapContainer.css({
    height: '350px',
    border: '2px solid #faa541'
});

let map = L.map('pee')
    .setView([38.984263, -3.906514], 15);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

let marker = L.marker([38.984263, -3.906514]).addTo(map);

marker.bindPopup('<strong>Menswear-BQ</strong><br>Nuestro almacen.').openPopup();

map.on('click', function (event) {
    L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
});
map.on('contextmenu', function (event) {
    marker.setLatLng([event.latlng.lat, event.latlng.lng]);
});