$('#changeColorSelect').on('change', function () {
    let color = $(this).val();
    if (color === "grey") {
        $('body').css("background-image", 'none');
        $('body').css("background-color", 'rgba(187, 183, 183, 0.425)');
        $('body').css("color", 'black');
        $('footer').css("background-color", 'rgba(62, 73, 126, 0.253');
        $('h2').css("color", 'black');
    } else {
        $('body').css("background-image", 'url("../img/dark-canvas.gif")');
        $('body').css("color", 'white');
        $('footer').css("background-color", 'rgba(196, 233, 255, 0.253)');
        $('h2').css("color", 'white');
    }
});