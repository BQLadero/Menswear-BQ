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

function barraProgress() {
    let progreso = document.getElementById("bar");
    let pixeles = 0;
    let usuario = document.getElementById("sesion__f1--usu");
    let password = document.getElementById("sesion__f1--Key");

    if(usuario.value.length>1 && usuario.value.length<21 ){
        pixeles+=400;
        progreso.style.width=pixeles+"px";
    }
    if(password.value.length>7 && password.value.length<21){
        pixeles+=400;
        progreso.style.width=pixeles+"px";
    }
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

    if(nombre.value.length>2 && nombre.value.length<21 ){
        pixeles+=125;
        progreso.style.width=pixeles+"px";
    }
    if(apellidos.value.length>4 && apellidos.value.length<41){
        pixeles+=125;
        progreso.style.width=pixeles+"px";
    }
    if(pwd.value.length>7 && pwd.value.length<21){
        pixeles+=125;
        progreso.style.width=pixeles+"px";
    }
    if(direccion.value.length>9){
        pixeles+=125;
        progreso.style.width=pixeles+"px";
    }

    let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(pattern.test(email.value)){
        pixeles+=125;
        progreso.style.width=pixeles+"px";
    }
    if(tlf.value.length>8 && tlf.value.length<10){
        pixeles+=125;
        progreso.style.width=pixeles+"px";
    }
}