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
            showFeedBack($(this.nifShop), true);
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
            if (/^[0-9]{9}$/.test(this.phoneShop)) {
                isValid = false;
                showFeedBack($(this.phoneShop), false);
                firstInvalidElement = this.phoneShop;
            } else {
                isValid = true;
                showFeedBack($(this.phoneShop), false);
            }
        } else {
            showFeedBack($(this.phoneShop), true);
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
            showFeedBack($(this.priceProduct), true);
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
        if (!this.alturaTraje.checkValidity()) {
            isValid = false;
            showFeedBack($(this.alturaTraje), false);
            firstInvalidElement = this.alturaTraje;
        } else {
            showFeedBack($(this.alturaTraje), true);
        }

        if (!this.cierreTraje.checkValidity()) {
            isValid = false;
            showFeedBack($(this.cierreTraje), false);
            firstInvalidElement = this.cierreTraje;
        } else {
            showFeedBack($(this.cierreTraje), true);
        }

        if (!this.cuidadosTraje.checkValidity()) {
            isValid = false;
            showFeedBack($(this.cuidadosTraje), false);
            firstInvalidElement = this.cuidadosTraje;
        } else {
            showFeedBack($(this.cuidadosTraje), true);
        }

        if (!this.detallesTraje.checkValidity()) {
            isValid = false;
            showFeedBack($(this.detallesTraje), false);
            firstInvalidElement = this.detallesTraje;
        } else {
            showFeedBack($(this.detallesTraje), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            if (this.selectTypeProduct.value === "traje") {
                handler(this.serialNumber.value, this.nameProd.value, this.priceProduct.value, this.taxProduct.value, this.alturaTraje.value,
                    this.cierreTraje.value, this.cuidadosTraje.value, this.detallesTraje.value, this.desProduct.value, this.imageProduct.value, checkArr, this.selectTypeProduct.value);
            }

        }
        alert(this.selectTypeProduct.value);
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

export { showFeedBack, defaultCheckElement, ocultForm, newCategoryValidation, removeCategoryValidation, newShopValidation, removeShopValidation, newProductValidation };
