 // variables glovales a usar
const cont = document.getElementById('cont');
const mapa = document.getElementById('mapa-zonas');
const img = document.getElementById('mi-imagen');
var i = 1; // contador para saber cuantos elementos van y asignar id a cada elemento
var arrayAreas=[];

// Agrega un evento click al mapa
img.addEventListener('click', function(evento) {
  // Obtiene las coordenadas del cursor en relación con la imagen
  const x = evento.offsetX;
  const y = evento.offsetY;

	/** creamos la nueva area **/
  const nuevaArea = document.createElement('area');
  nuevaArea.setAttribute('shape', 'rect');
  nuevaArea.setAttribute('id', 'area'+i);
  nuevaArea.setAttribute('coords', (x-10)+','+(y-10)+','+x+','+y);
   // Agrega un cursor personalizado al elemento de área
  nuevaArea.style.cursor = 'pointer';
  // Agrega el nuevo elemento de área al mapa de imagen
  mapa.appendChild(nuevaArea);

/** agregamos nuevo  elemento (combo)**/
var input = document.createElement('select');
input.setAttribute('id', 'in'+i);
input.setAttribute('style', 'position: absolute; left: '+(x-10)+'px; top: '+(y-10)+'px; font-weight: bold; z-index:100;');
cont.appendChild(input);

 var cb = document.getElementById('in'+i);
 for(let o = 1; o<=3 ; o++){
    let op = document.createElement('option');
    op.setAttribute('value','op'+o);
    op.textContent='valor-'+o;
    cb.appendChild(op);
 }



/** icono de eliminar **/
var label = document.createElement('i');
label.setAttribute('id', 'lab'+i);
label.setAttribute('style', 'cursor:pointer; color:red; position: absolute; left: '+(x-40)+'px; top: '+(y-10)+'px; font-weight: bold; z-index:100;');
//label.textContent = "del";
label.setAttribute('class', 'fa fa-trash');
cont.appendChild(label);


/** seccion de evento para eliminar elemento creados ***/
  var del = document.getElementById('lab'+i);
  var elem = document.getElementById('in'+i);
  var area = document.getElementById('area'+i);
  del.addEventListener('click', function(evento) {
  	//console.log(elem)
    elem.remove();
    area.remove();
    this.remove();
    //console.log(this)
  })
  
  /*** almacenamos datos en una variable gloval con array para uso de responsivo**/
  let obTosave = {
  	id:i, // contador
    pantalla_x:img.width,
    pantalla_y:img.height,
    coordenada_x:x,
    coordenada_y:y
  }
  arrayAreas.push(obTosave);
i++ // incremento de contador
});

/**
* funcion para actualizar las coordenadas al redimencionar la pantalla
**/
function resize(id,xant,yant,px,py){
	//spanId
    //let xant=184.00,yant=372.00,px=883.00,py=442.00;
    let x=0,y=0,px2=0,py2=0,px3=0,py3=0;
    px2=img.width;//1129
    py2=img.height;//565
    px3=px2/px
    py3=py2/py
    
    x=xant*px3;
    y=yant*py3;
    
    var del = document.getElementById('lab'+id);
    var elem = document.getElementById('in'+id);
    var area = document.getElementById('area'+id);
    if(del!=null){
     del.setAttribute('style','position: absolute; color:red; left:'+(x-40)+'px; top: '+(y-10)+'px; font-weight: bold; z-index:100;')
    }
    if(elem!=null){
    	 elem.setAttribute('style','position: absolute; left: '+(x-10)+'px; top: '+(y-10)+'px; font-weight: bold; z-index:100;')
    }
   if(area!=null){
    	 area.setAttribute('coords',(x-10)+','+(y-10)+','+x+','+y)
    }
    
    
}

/*** evento windows para escuchar el redimencionamiento de la pantalla ***/
    window.addEventListener("resize", function(){
    
     if(window.innerWidth < 700){
    	img.setAttribute('style','width:680px')
    }else{
    	img.setAttribute('style','width:100%')
    }
    
      for(let n = 0 ; n < arrayAreas.length ;n++ ){
            let cx = arrayAreas[n].coordenada_x;
            let cy = arrayAreas[n].coordenada_y;
            let px = arrayAreas[n].pantalla_x;
            let py = arrayAreas[n].pantalla_y;
            // llamado de funcion @resize
            resize(n+1,cx,cy,px,py);
        }
        
  });
