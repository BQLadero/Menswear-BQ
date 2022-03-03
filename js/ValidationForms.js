function validarName(params) {
    usuario = document.getElementById("sesion__f1--usu").value;
    document.getElementById("sesion__f1--usuDiv");

    if (usuario.length < 1) {
        document.getElementById("sesion__f1--usuDiv").innerHTML += " Introducido incorrectamente";
    } else {
        document.getElementById("sesion__f1--usuDiv").innerHTML = "Correcto";

    }
}

(function () {
    'use strict';
    window.addEventListener('load', function () {
        let forms = document.getElementsByClassName('needs-validation form1');

        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    window.addEventListener('load', function () {
        let forms = document.getElementsByClassName('needs-validation form2');

        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    window.addEventListener('load', function () {
        let forms = document.getElementsByClassName('needs-validation form3');

        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    window.addEventListener('load', function () {
        let forms = document.getElementsByClassName('needs-validation form4');

        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();