var juego={
	filas:[[],[],[]],
	espacioVacio:{
		fila:2,
		columna:2
	},
		crearPieza:function(numero,fila, columna){
		var object = $('<div>');
        object.addClass('pieza');
		object.css({
        backgroundImage:'url(piezas/' + numero + '.jpg)',
        top: fila * 200,
        left: columna * 200
    }
    );
	return {
      element:object,
      numero:numero,
      filaIni:fila,
      columnaIni:columna,
    };
	},
	instalarPieza:function(dom){
		var cont=1;
		for (var fila =0; fila <3; fila++) {
			for (var columna = 0; columna < 3; columna++) {
				if (fila == this.espacioVacio.fila && columna== this.espacioVacio.columna) {
					this.filas[fila][columna]= null;
				}else{
					var pieza = this.crearPieza(cont++,fila,columna);
          			dom.append(pieza.element);
          			this.filas[fila][columna] = pieza;
				}
			}
		}return dom;
	}, 
	moverFichaFilaColumna(ficha,fila,columna){
    ficha.element.css({
      top: fila * 200,
      left: columna * 200
    })
  },
    guardarEspacioVacio(fila,columna){
    this.espacioVacio.fila = fila;
    this.espacioVacio.columna = columna;
	this.filas[fila][columna] = null;
  },
  intercambiarPosicionesConEspacioVacio(fila, columna){
    var ficha = this.filas[fila] && this.filas[fila][columna];
    if(ficha){
      this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
      this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
      this.guardarEspacioVacio(fila,columna);
      
    }
    this.verificarSiGano();
  },
  moverHaciaAbajo(){
    var filaIni = this.espacioVacio.fila-1;
    var columnaIni = this.espacioVacio.columna;
    this.intercambiarPosicionesConEspacioVacio(filaIni, columnaIni);
  },
  moverHaciaArriba(){
    var filaIni = this.espacioVacio.fila+1;
    var columnaIni = this.espacioVacio.columna;
   this.intercambiarPosicionesConEspacioVacio(filaIni, columnaIni);
  },
  moverHaciaLaDerecha(){
    var filaIni = this.espacioVacio.fila;
    var columnaIni = this.espacioVacio.columna-1;
    this.intercambiarPosicionesConEspacioVacio(filaIni, columnaIni);
  },
  moverHaciaLaIzquierda(){
    var filaIni = this.espacioVacio.fila;
    var columnaIni = this.espacioVacio.columna+1;
   this.intercambiarPosicionesConEspacioVacio(filaIni, columnaIni);
  },
    verificarSiGano:function(){
    for (var i = 0; i < this.filas.length; i++) {
      for (var c = 0; c < this.filas.length; c++) {
        var ficha = this.filas[i][c];
        if(ficha && !(ficha.filaIni == i && ficha.columnaIni== c)){
          return false;
          
        }
      }
    }
     alert('ha ganado felicidades');
  },
  mezclarFichas:function(cantVeces){
    var refer=this;
    var mover=new Array(4);
    mover[0]="moverHaciaAbajo";
    mover[1]="moverHaciaArriba";
    mover[2]="moverHaciaLaDerecha";
    mover[3]="moverHaciaLaIzquierda";

   var aleatorio=0;
    for (var i = 0; i < cantVeces; i++) {
      aleatorio =Math.round(Math.random()*100);
      console.log(aleatorio);
      if (aleatorio<26) {refer[mover[0]]();}
      if (aleatorio>25 && aleatorio<51) {refer[mover[1]]();}
    if (aleatorio>50 && aleatorio<76) {refer[mover[2]]();}
    if (aleatorio>75) {refer[mover[3]]();}

  }},
  capturarTeclas:function(){
	var capturar = this;
    $(document).keydown(function(evento) {
        switch(evento.which) {
        case 37:
          capturar.moverHaciaLaIzquierda();
          
        break;
		case 38:
          capturar.moverHaciaArriba();
         
        break;
		case 39:
          capturar.moverHaciaLaDerecha();

        break;	
		case 40:
          capturar.moverHaciaAbajo();

        break;
    case 77:
          console.log('hola');
          capturar.mezclarFichas(10);
          
          break;
        }
        
    });},
	iniciar:function(element){
	this.instalarPieza(element);
	this.capturarTeclas();
  this.mezclarFichas(10);
	}
	}


$(document).ready(function(){
	var elemento=$('#juego');

	juego.iniciar(elemento);
})