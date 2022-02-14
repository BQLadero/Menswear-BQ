// CONSTANTES
DIR_IMG = "../img/";
LARGO = "520";
ALTO = "230";
POSX_INICIAL = Math.round(LARGO/2) - 15;
POSY_INICIAL = ALTO - 15;
JUEGO_FPS = 50;
var micanvas;
var contexto;

window.onload = function() {
	micanvas = document.getElementById("minijuego--canv");
	contexto = micanvas.getContext("2d");	
	
    var juego = new Juego();
};

var ManejadorDeEventos = function(nave) {
	this.nave = nave;
	
	this.tecla = function(e) {

		// se obtiene el evento
		var evento = e || window.event;				
		
		switch (evento.keyCode) {
			case 97:
				nave.moverIzquierda();				
		    break;
		    
			case 100:
				nave.moverDerecha();				
		    break;	
		    
			case 115:
				nave.moverAbajo();				
		    break;	
		    
			case 119:
				nave.moverArriba();				
		    break;	
		}				
		
		return 0;
	};
	
	document.body.onkeypress = this.tecla;	
};

var Nave = function () {
	// atributos
    this.posx = new Number(POSX_INICIAL);
    this.posy = new Number(POSY_INICIAL);
    this.figura = new Image();
    this.figura.src = "../img/jugadorfutbol-mediano--DER.png";
    
    this.dibujar = function() {
    	var figura = this.getFigura();
    	var x = this.getX();
    	var y = this.getY();
    	
    	if (isNaN(x) || isNaN(y)) {    		
    		x = Math.rint(LARGO/2);
    		y = ALTO + 15;
    	}
    	  		
    	contexto.drawImage(figura,x,y,250,150);
    	
    };
    
    this.getX = function() {
    	return this.posx;
    };
    
    this.getY = function() {
    	return this.posy;
    };    
    
    this.getFigura = function() {
    	return this.figura;
    };
    	
    this.moverArriba = function() {
		if(this.posy<10){
			alert('¿A dónde vas? ¡Que te sales del campo!');
		}else{
			this.posy-=15;
		}
    };
    
    this.moverAbajo = function() {
		if(this.posy>475){
			alert('¿A dónde vas? ¡Que te sales del campo!');
		}else{
			this.posy+=15;
		}
    };
    
    this.moverIzquierda = function()  {
		if(this.posx<-5){
			alert('¿A dónde vas? ¡Que te sales del campo!');
		}else{
    		this.posx-=15;
		}
    };
    
    this.moverDerecha = function() {
		if((this.posx===620)&&(this.posy>=155&&this.posy<=275)){
			alert('¡Menudo golazo!');
			this.posx= 200;
			this.posy = 230;
			//590 y 125
		}else if((this.posx===605&&this.posy===125)||(this.posx===605&&this.posy===260)){
			alert('¡Al palooo!')
		}else if(this.posx>620){
			alert('¿A dónde vas? ¡Que te sales del campo!');
		}else{
    		this.posx+=15;
		}
    };    
};

function limpiar () {
	micanvas.width = micanvas.width;

}

var Juego = function() {
	var viper = new Nave();
	var manejadornave = new ManejadorDeEventos(viper);	
	
	this.correr = function() {
		limpiar();
		viper.dibujar();
	};
	
	var intervalId = setInterval(this.correr, 1000 / JUEGO_FPS);
	
};
