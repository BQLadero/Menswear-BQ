let dialog = document.getElementsByTagName("dialog")[0];

function showDialog() {
    dialog.show();
}

function closeDialog() {
    dialog.close();
}

let form = document.getElementById("form");
let card__cred = document.getElementById("card__cred");
let card__paypal = document.getElementById("card__paypal");
card__cred.style.display = 'block';
card__paypal.style.display = 'none';

function mtdCard() {
    card__cred.style.display = 'block';
    card__paypal.style.display = 'none';
}

function mtdPaypal() {
    card__cred.style.display = 'none';
    card__paypal.style.display = 'block';
}

let shopmap = $('.almacen');
shopmap.empty();
//Contenedor del mapa
shopmap.append($('<div class="container"><div class="m-4" id="mapid"></div></div>'));
let mapContainer = $('#mapid');
mapContainer.css({
    height: '350px',
    border: '2px solid #faa541'
});

let map = L.map('mapid')
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