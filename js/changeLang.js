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
    var lang = $(this).val();
    var doc = json;
    $('.lang').each(function (index, element) {
      $(this).text(doc[lang][$(this).attr('key')]);
    }); //Each
  }); //Funcion click
});//Get json AJAX
