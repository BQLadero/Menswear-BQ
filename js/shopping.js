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