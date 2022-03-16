$.getJSON("js/lang.json", function (json) {
  //Lenguaje por defecto de la página sessionStorage.setItem("lang", "idioma")"
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "es");
  }
  var lang = localStorage.getItem("lang");
  var doc = json;
  $('.lang').each(function (index, element) {
    $(this).text(doc[lang][$(this).attr('key')]);
  });//Each
  $('#changeLangSelect').on('change', function () {
    localStorage.setItem("lang", $(this).val());
    if($(this).val()==="es"){
      $("#terminoEs").css('display', 'block');
      $("#terminoEn").css('display', 'none');
      $("#cookiesEs").css('display', 'block');
      $("#cookiesEn").css('display', 'none');
      $("#privacidadEs").css('display', 'block');
      $("#privacidadEn").css('display', 'none');
    }else{
      $("#terminoEs").css('display', 'none');
      $("#terminoEn").css('display', 'block');
      $("#cookiesEs").css('display', 'none');
      $("#cookiesEn").css('display', 'block');
      $("#privacidadEs").css('display', 'none');
      $("#privacidadEn").css('display', 'block');
    }
    var lang = $(this).val();
    var doc = json;
    $('.lang').each(function (index, element) {
      $(this).text(doc[lang][$(this).attr('key')]);
    }); //Each
  }); //Funcion click
});//Get json AJAX
