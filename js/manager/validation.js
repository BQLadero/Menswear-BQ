function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}

function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack($(this), false);
    } else {
        showFeedBack($(this), true);
    }
}


function ocultForm() {
    $('#productTraje').css('display', 'block');
    $('#productTraje2').css('display', 'block');
    $('#productTraje3').css('display', 'block');
    $('#productTraje4').css('display', 'block');
    $('#productTraje5').css('display', 'block');
    $('#productBota').css('display', 'none');
    $('#productBota1').css('display', 'none');
    $('#productBota2').css('display', 'none');
    $('#productBota3').css('display', 'none');
    $('#productBota4').css('display', 'none');
    $('#productPantalon').css('display', 'none');
    $('#productPantalon1').css('display', 'none');
    $('#productPantalon2').css('display', 'none');
    $('#productPantalon3').css('display', 'none');
    $('#productPantalon4').css('display', 'none');
    $('#productCalcetin').css('display', 'none');
    $('#productCalcetin1').css('display', 'none');
    $('#productCalcetin2').css('display', 'none');
    $('#productCalcetin3').css('display', 'none');
    $('#productCalcetin4').css('display', 'none');
    $('#categoryNewProductP').css('display', 'none');
}

function newCategoryValidation(handler) {
    let form = document.forms.fNewCategory;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        this.ncDescription.value = this.ncDescription.value.trim();
        showFeedBack($(this.ncDescription), true);

        if (!this.ncTitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.ncTitle), false);
            firstInvalidElement = this.ncTitle;
        } else {
            showFeedBack($(this.ncTitle), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.ncTitle.value, this.ncDescription.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.ncTitle).change(defaultCheckElement);
}

function removeCategoryValidation(handler) {
    let form = document.forms.fRemCategory;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        //Como las categorias existen si o si, y no hay ningun option vacio, no hace falta hacer validaciones
        handler(this.selectRemoveCategory.value);
        event.preventDefault();
        event.stopPropagation();
    });
    $(form.selectRemoveCategory).change(defaultCheckElement);
}

function newShopValidation(handler) {
    let form = document.forms.fNewShop;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.nifShop.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nifShop), false);
            firstInvalidElement = this.nifShop;
        } else {
            if (this.nifShop.value < 1) {
                isValid = false;
                showFeedBack($(this.nifShop), false);
                firstInvalidElement = this.nifShop;
            } else {
                isValid = true;
                showFeedBack($(this.nifShop), true);
            }
        }

        if (!this.nameShop.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nameShop), false);
            firstInvalidElement = this.nameShop;
        } else {
            showFeedBack($(this.nameShop), true);
        }

        if (!this.addressShop.checkValidity()) {
            isValid = false;
            showFeedBack($(this.addressShop), false);
            firstInvalidElement = this.addressShop;
        } else {
            showFeedBack($(this.addressShop), true);
        }

        if (!this.phoneShop.checkValidity()) {
            isValid = false;
            showFeedBack($(this.phoneShop), false);
            firstInvalidElement = this.phoneShop;
        } else {
            if (!/^[0-9]{9}$/.test(this.phoneShop.value)) {
                isValid = false;
                showFeedBack($(this.phoneShop), false);
                firstInvalidElement = this.phoneShop;
            } else {
                isValid = true;
                showFeedBack($(this.phoneShop), true);
            }
        }

        if (!this.coordsShop.checkValidity()) {
            isValid = false;
            showFeedBack($(this.coordsShop), false);
            firstInvalidElement = this.coordsShop;
        } else {
            showFeedBack($(this.coordsShop), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.nifShop.value, this.nameShop.value, this.addressShop.value, this.phoneShop.value, this.coordsShop.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.nifShop).change(defaultCheckElement);
    $(form.nameShop).change(defaultCheckElement);
    $(form.addressShop).change(defaultCheckElement);
    $(form.phoneShop).change(defaultCheckElement);
    $(form.coordsShop).change(defaultCheckElement);
}

function removeShopValidation(handler) {
    let form = document.forms.fRemShop;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        //Como las tiendas existen si o si, y no hay ningun option vacio, no hace falta hacer validaciones
        handler(this.selectRemoveShop.value);
        event.preventDefault();
        event.stopPropagation();
    });
    $(form.selectRemoveShop).change(defaultCheckElement);
}

function newProductValidation(handler) {
    let form = document.forms.fNewProduct;
    $(form).attr('novalidate', true);
    $('#selectTypeProduct').on('change', function () {
        let product = $(this).val();
        if (product === "traje") {
            $('#productTraje').css('display', 'block');
            $('#productTraje2').css('display', 'block');
            $('#productTraje3').css('display', 'block');
            $('#productTraje4').css('display', 'block');
            $('#productTraje5').css('display', 'block');
            $('#productBota').css('display', 'none');
            $('#productBota1').css('display', 'none');
            $('#productBota2').css('display', 'none');
            $('#productBota3').css('display', 'none');
            $('#productBota4').css('display', 'none');
            $('#productPantalon').css('display', 'none');
            $('#productPantalon1').css('display', 'none');
            $('#productPantalon2').css('display', 'none');
            $('#productPantalon3').css('display', 'none');
            $('#productPantalon4').css('display', 'none');
            $('#productCalcetin').css('display', 'none');
            $('#productCalcetin1').css('display', 'none');
            $('#productCalcetin2').css('display', 'none');
            $('#productCalcetin3').css('display', 'none');
            $('#productCalcetin4').css('display', 'none');
        } else if (product === "bota") {
            $('#productTraje').css('display', 'none');
            $('#productTraje2').css('display', 'none');
            $('#productTraje3').css('display', 'none');
            $('#productTraje4').css('display', 'none');
            $('#productTraje5').css('display', 'none');
            $('#productBota').css('display', 'block');
            $('#productBota1').css('display', 'block');
            $('#productBota2').css('display', 'block');
            $('#productBota3').css('display', 'block');
            $('#productBota4').css('display', 'block');
            $('#productPantalon').css('display', 'none');
            $('#productPantalon1').css('display', 'none');
            $('#productPantalon2').css('display', 'none');
            $('#productPantalon3').css('display', 'none');
            $('#productPantalon4').css('display', 'none');
            $('#productCalcetin').css('display', 'none');
            $('#productCalcetin1').css('display', 'none');
            $('#productCalcetin2').css('display', 'none');
            $('#productCalcetin3').css('display', 'none');
            $('#productCalcetin4').css('display', 'none');
        } else if (product === "pantalon") {
            $('#productTraje').css('display', 'none');
            $('#productTraje2').css('display', 'none');
            $('#productTraje3').css('display', 'none');
            $('#productTraje4').css('display', 'none');
            $('#productTraje5').css('display', 'none');
            $('#productBota').css('display', 'none');
            $('#productBota1').css('display', 'none');
            $('#productBota2').css('display', 'none');
            $('#productBota3').css('display', 'none');
            $('#productBota4').css('display', 'none');
            $('#productPantalon').css('display', 'block');
            $('#productPantalon1').css('display', 'block');
            $('#productPantalon2').css('display', 'block');
            $('#productPantalon3').css('display', 'block');
            $('#productPantalon4').css('display', 'block');
        } else {
            $('#productTraje').css('display', 'none');
            $('#productTraje2').css('display', 'none');
            $('#productTraje3').css('display', 'none');
            $('#productTraje4').css('display', 'none');
            $('#productTraje5').css('display', 'none');
            $('#productBota').css('display', 'none');
            $('#productBota1').css('display', 'none');
            $('#productBota2').css('display', 'none');
            $('#productBota3').css('display', 'none');
            $('#productBota4').css('display', 'none');
            $('#productPantalon').css('display', 'none');
            $('#productPantalon1').css('display', 'none');
            $('#productPantalon2').css('display', 'none');
            $('#productPantalon3').css('display', 'none');
            $('#productPantalon4').css('display', 'none');
            $('#productCalcetin').css('display', 'block');
            $('#productCalcetin1').css('display', 'block');
            $('#productCalcetin2').css('display', 'block');
            $('#productCalcetin3').css('display', 'block');
            $('#productCalcetin4').css('display', 'block');
        }
    });

    $('input:checked').each(
        function () { $('#categoryNewProductP').css('display', 'none') }
    );

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        if (!this.serialNumber.checkValidity()) {
            isValid = false;
            showFeedBack($(this.serialNumber), false);
            firstInvalidElement = this.serialNumber;
        } else {
            showFeedBack($(this.serialNumber), true);
        }

        if (!this.nameProd.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nameProd), false);
            firstInvalidElement = this.nameProd;
        } else {
            showFeedBack($(this.nameProd), true);
        }

        if (!this.priceProduct.checkValidity()) {
            isValid = false;
            showFeedBack($(this.priceProduct), false);
            firstInvalidElement = this.priceProduct;
        } else {
            if (this.priceProduct.value <= 0) {
                isValid = false;
                showFeedBack($(this.priceProduct), false);
                firstInvalidElement = this.priceProduct;
            } else {
                isValid = true;
                showFeedBack($(this.priceProduct), true);
            }
        }

        if (!this.taxProduct.checkValidity()) {
            isValid = false;
            showFeedBack($(this.taxProduct), false);
            firstInvalidElement = this.taxProduct;
        } else {
            showFeedBack($(this.taxProduct), true);
        }

        if (!this.selectTypeProduct.checkValidity()) {
            isValid = false;
            showFeedBack($(this.selectTypeProduct), false);
            firstInvalidElement = this.selectTypeProduct;
        } else {
            showFeedBack($(this.selectTypeProduct), true);
        }

        this.desProduct.value = this.desProduct.value.trim();
        showFeedBack($(this.desProduct), true);

        if (!this.imageProduct.checkValidity()) {
            isValid = false;
            showFeedBack($(this.imageProduct), false);
            firstInvalidElement = this.imageProduct;
        } else {
            showFeedBack($(this.imageProduct), true);
        }

        let checkArr = [];
        $('input:checked').each(
            function () {
                checkArr.push($(this).val())
            }
        );
        if (checkArr.length !== 0) {
            $('#categoryNewProductP').css('display', 'none');
        } else {
            isValid = false;
            $('#categoryNewProductP').css('display', 'block');
        }

        /* Traje */
        let espe1, espe2, espe3, espe4;
        if (this.selectTypeProduct.value === "traje") {
            if (!this.alturaTraje.checkValidity()) {
                isValid = false;
                showFeedBack($(this.alturaTraje), false);
                firstInvalidElement = this.alturaTraje;
            } else {
                if (this.alturaTraje.value <= 0) {
                    isValid = false;
                    showFeedBack($(this.alturaTraje), false);
                    firstInvalidElement = this.alturaTraje;
                } else {
                    espe1 = this.alturaTraje.value;
                    showFeedBack($(this.alturaTraje), true);
                }
            }

            if (!this.cierreTraje.checkValidity()) {
                isValid = false;
                showFeedBack($(this.cierreTraje), false);
                firstInvalidElement = this.cierreTraje;
            } else {
                espe2 = this.cierreTraje.value;
                showFeedBack($(this.cierreTraje), true);
            }

            if (!this.cuidadosTraje.checkValidity()) {
                isValid = false;
                showFeedBack($(this.cuidadosTraje), false);
                firstInvalidElement = this.cuidadosTraje;
            } else {
                espe3 = this.cuidadosTraje.value;
                showFeedBack($(this.cuidadosTraje), true);
            }

            if (!this.detallesTraje.checkValidity()) {
                isValid = false;
                showFeedBack($(this.detallesTraje), false);
                firstInvalidElement = this.detallesTraje;
            } else {
                espe4 = this.detallesTraje.value;
                showFeedBack($(this.detallesTraje), true);
            }
        } else if (this.selectTypeProduct.value === "bota") {
            if (!this.tallaBota.checkValidity()) {
                isValid = false;
                showFeedBack($(this.tallaBota), false);
                firstInvalidElement = this.tallaBota;
            } else {
                if (this.tallaBota.value <= 0) {
                    isValid = false;
                    showFeedBack($(this.tallaBota), false);
                    firstInvalidElement = this.tallaBota;
                } else {
                    espe1 = this.tallaBota.value;
                    showFeedBack($(this.tallaBota), true);
                }
            }

            if (!this.cierreBota.checkValidity()) {
                isValid = false;
                showFeedBack($(this.cierreBota), false);
                firstInvalidElement = this.cierreBota;
            } else {
                espe2 = this.cierreBota.value;
                showFeedBack($(this.cierreBota), true);
            }

            if (!this.suelaBota.checkValidity()) {
                isValid = false;
                showFeedBack($(this.suelaBota), false);
                firstInvalidElement = this.suelaBota;
            } else {
                espe3 = this.suelaBota.value;
                showFeedBack($(this.suelaBota), true);
            }

            if (!this.plantillaBota.checkValidity()) {
                isValid = false;
                showFeedBack($(this.plantillaBota), false);
                firstInvalidElement = this.plantillaBota;
            } else {
                espe4 = this.plantillaBota.value;
                showFeedBack($(this.plantillaBota), true);
            }
        } else if (this.selectTypeProduct.value === "pantalon") {
            if (!this.cintuPantalon.checkValidity()) {
                isValid = false;
                showFeedBack($(this.cintuPantalon), false);
                firstInvalidElement = this.cintuPantalon;
            } else {
                espe1 = this.cintuPantalon.value;
                showFeedBack($(this.cintuPantalon), true);
            }

            if (!this.cierrePantalon.checkValidity()) {
                isValid = false;
                showFeedBack($(this.cierrePantalon), false);
                firstInvalidElement = this.cierrePantalon;
            } else {
                espe2 = this.cierrePantalon.value;
                showFeedBack($(this.cierrePantalon), true);
            }

            if (!this.bolsilloPantalon.checkValidity()) {
                isValid = false;
                showFeedBack($(this.bolsilloPantalon), false);
                firstInvalidElement = this.bolsilloPantalon;
            } else {
                espe3 = this.bolsilloPantalon.value;
                showFeedBack($(this.bolsilloPantalon), true);
            }

            if (!this.materialPantalon.checkValidity()) {
                isValid = false;
                showFeedBack($(this.materialPantalon), false);
                firstInvalidElement = this.materialPantalon;
            } else {
                espe4 = this.materialPantalon.value;
                showFeedBack($(this.materialPantalon), true);
            }
        } else if (this.selectTypeProduct.value === "calcetin") {
            if (!this.diseCalcetin.checkValidity()) {
                isValid = false;
                showFeedBack($(this.diseCalcetin), false);
                firstInvalidElement = this.diseCalcetin;
            } else {
                espe1 = this.diseCalcetin.value;
                showFeedBack($(this.diseCalcetin), true);
            }

            if (!this.tipoPantalon.checkValidity()) {
                isValid = false;
                showFeedBack($(this.tipoPantalon), false);
                firstInvalidElement = this.tipoPantalon;
            } else {
                espe2 = this.tipoPantalon.value;
                showFeedBack($(this.tipoPantalon), true);
            }

            if (!this.materialCalcetin.checkValidity()) {
                isValid = false;
                showFeedBack($(this.materialCalcetin), false);
                firstInvalidElement = this.materialCalcetin;
            } else {
                espe3 = this.materialCalcetin.value;
                showFeedBack($(this.materialCalcetin), true);
            }

            if (!this.packCalcetin.checkValidity()) {
                isValid = false;
                showFeedBack($(this.packCalcetin), false);
                firstInvalidElement = this.packCalcetin;
            } else {
                if (this.packCalcetin.value <= 0) {
                    isValid = false;
                    showFeedBack($(this.packCalcetin), false);
                    firstInvalidElement = this.packCalcetin;
                } else {
                    espe4 = this.packCalcetin.value;
                    showFeedBack($(this.packCalcetin), true);
                }
            }
        } else {
            isValid = false;
        }


        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.serialNumber.value, this.nameProd.value, this.priceProduct.value, this.taxProduct.value, espe1, espe2, espe3, espe4,
                this.desProduct.value, this.imageProduct.value, checkArr, this.selectTypeProduct.value);
            form.reset();
            $('#categoryNewProductP').css('display', 'none');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.serialNumber).change(defaultCheckElement);
    $(form.nameProd).change(defaultCheckElement);
    $(form.priceProduct).change(defaultCheckElement);
    $(form.taxProduct).change(defaultCheckElement);
    $(form.selectTypeProduct).change(defaultCheckElement);
    $(form.desProduct).change(defaultCheckElement);
    $(form.imageProduct).change(defaultCheckElement);
}

function selectTypeValidation(handler) {
    let form = document.forms.fRemProduct;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        /*$('#selectTypeRemProduct').on('change', function () {
            type = $(this).val();
        });*/
        if (!this.selectTypeRemProduct.checkValidity()) {
            isValid = false;
            showFeedBack($(this.selectTypeRemProduct), false);
            firstInvalidElement = this.selectTypeRemProduct;
        } else {
            showFeedBack($(this.selectTypeRemProduct), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.selectTypeRemProduct.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.selectTypeRemProduct).change(defaultCheckElement);
}

function removeProductTypeForm(handler) {
    let form = document.forms.fRemTypeProduct;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        let checkArr = [];
        $('input:checked').each(
            function () {
                checkArr.push($(this).val())
            }
        );

        if (checkArr.length !== 0) {
            $('#typeRemProduct').css('display', 'none');
        } else {
            isValid = false;
            $('#typeRemProduct').css('display', 'block');
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(checkArr);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    //$(form.selectTypeRemProduct).change(defaultCheckElement);
}

function removeProductShopValidation(handler) {
    let form = document.forms.fRemProductShop;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        //Como las tiendas existen si o si, y no hay ningun option vacio, no hace falta hacer validaciones
        handler(this.selectRemoveProductShop.value);
        event.preventDefault();
        event.stopPropagation();
    });
    $(form.selectRemoveProductShop).change(defaultCheckElement);
}

function removeProductShopForm(handler) {
    let form = document.forms.fRemProductInShop;
    let form2 = document.forms.fRemProductShop;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let checkArr = [];
        $('input:checked').each(
            function () {
                checkArr.push($(this).val())
            }
        );

        if (checkArr.length !== 0) {
            $('#categoryRemProductShopP').css('display', 'none');
        } else {
            isValid = false;
            $('#categoryRemProductShopP').css('display', 'block');
        }

        if (!isValid) {
            form2.selectRemoveProductShop.focus();
        } else {
            handler(checkArr, form2.selectRemoveProductShop.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    //$(form.selectTypeRemProduct).change(defaultCheckElement);
}

function selectProductShopFormValidation(handler) {
    let form = document.forms.fAddStockProShop;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        //Como las tiendas existen si o si, y no hay ningun option vacio, no hace falta hacer validaciones
        handler(this.selectAddStockProShop.value);
        event.preventDefault();
        event.stopPropagation();
    });
    $(form.selectAddStockProShop).change(defaultCheckElement);
}

function selectProductShopForm2Validation(handler) {
    let form = document.forms.fAddStockProInShop;
    let form2 = document.forms.fAddStockProShop;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (!this.stockProduct.checkValidity()) {
            isValid = false;
            showFeedBack($(this.stockProduct), false);
            firstInvalidElement = this.stockProduct;
        } else {
            showFeedBack($(this.stockProduct), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.selectAddStockProShop2.value, this.stockProduct.value, form2.selectAddStockProShop.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    $(form.selectAddStockProShop).change(defaultCheckElement);
}

function logInFormValidation(handler) {
    /*let form = document.forms.fLogin;
    $(form).submit((event) => {
        handler(form.nameIniSesion.value, form.passIniSesion.value, form.remember.checked);
        event.preventDefault();
    });*/
    let form = document.forms.fLogin;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {

        let isValid = true;
        let firstInvalidElement = null;
        if (!this.nameIniSesion.checkValidity()) {
            isValid = false;
            showFeedBack($(this.nameIniSesion), false);
            firstInvalidElement = this.nameIniSesion;
        } else {
            if(this.nameIniSesion.value!=="admin"){
                $('.invalid-user').css('display', 'block');
                isValid = false;
                showFeedBack($(this.nameIniSesion), false);
                firstInvalidElement = this.nameIniSesion;
            }else{
                $('.invalid-user').css('display', 'none');
                showFeedBack($(this.nameIniSesion), true);
            }
        }

        if (!this.passIniSesion.checkValidity()) {
            isValid = false;
            showFeedBack($(this.passIniSesion), false);
            firstInvalidElement = this.passIniSesion;
        } else {
            if(this.passIniSesion.value!=="admin"){
                $('.invalid-password').css('display', 'block');
                isValid = false;
                firstInvalidElement = this.passIniSesion;
                showFeedBack($(this.passIniSesion), false);
            }else{
                $('.invalid-password').css('display', 'none');
                showFeedBack($(this.passIniSesion), true);
            }
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.nameIniSesion.value, this.passIniSesion.value, form.remember.checked);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    $(form.nameIniSesion).change(defaultCheckElement);
    $(form.passIniSesion).change(defaultCheckElement);
}

export { showFeedBack, defaultCheckElement, ocultForm, newCategoryValidation, removeCategoryValidation, newShopValidation, removeShopValidation, newProductValidation, selectTypeValidation, removeProductTypeForm, removeProductShopValidation, removeProductShopForm, selectProductShopFormValidation, selectProductShopForm2Validation, logInFormValidation };