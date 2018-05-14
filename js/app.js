//const pathLocal = "http://localhost/resultadosBecas/";

const pathLocal = "http://landing.beneficioslaaraucana.cl/resultadoBecas/";


$(document).ready(function() {
    console.log( "ready!" );   
    paginaUno();
    $('#rut').keydown(function(e) {
        if (e.keyCode == 13) {
           $('#btnSend').click(function(){
            btnBuscar();
           });
        }
    });

});

function loadBanner() {
    document.getElementById('slider').innerHTML = ` 
          <img class="responsive-img hide-on-med-and-up" src="assets/mobile2.jpg"  alt="Space">    
          <img class="responsive-img hide-on-small-only hide-on-large-only" src="assets/tablet2.jpg"  alt="Space">     
          <img class="responsive-img hide-on-med-and-down" src="assets/desktopHd2.jpg"  alt="Space"> 

    `;
}

function hideItems(){
  $("#addPhoto").hide();
  $("#addSearch").hide();
  $("#addBtn").hide();
}


function load(rut){
  const path = pathLocal+"api/product/resultados.php?rut=%22"+rut+"%22";
  console.log("path load:",path);
  $.get(path)
    .done(function( data ) {
    var aux ="";
     console.log(JSON.stringify(data));
     if (data.message == "No hay informacion."){
      console.log ("No hay registro disponible");
      $('#fieldNone').modal('open');
     }else{
      data= data.results.data;
     // console.log ("data:", data);
     
      for(var key in data){
        console.log(key + ' - ' + data[key].nombre_afiliado);
        if ( parseInt(key) == 0 ){
          aux += "<h3>" + data[key].nombre_afiliado +" " +data[key].apellidos_afiliado+" </h3>" ;
        }
        if(data[key].tiene_premio == " Si"){
          console.log("a1:",parseInt(key)%2);
          console.log("b1:",data.length);
          if(parseInt(key)%2 == 0  && (parseInt(key) == data.length -1)){
            aux += `
                <div  class="col s12 m6 offset-m3 cardCol">
                `;
          }else{
             aux += `
                <div  class="col s12 m6 cardCol">
                `;
          }
          aux2 =  String(data[key].mensaje);
          aux2 = aux2.replace('Proceso de Cobro:','<span><br><br>Proceso de Cobro: </span>');
          aux2 = aux2.replace('Fecha límite para el cobro del beneficio:','<span><br><br>Fecha límite para el cobro del beneficio:</span>');
          //console.log ("aux2:", aux2);

          aux += `
               <div class="card ">
                <div class="card-content">
                  <span class="card-title activator ">Felicitaciones</span>
                  <p class="p1">`+
                      data[key].nombre_postulante
                      +`
                      <br>
                      `+
                      data[key].apellidos_postulante
                      +`
                      <br>
                      `+  
                      data[key].nombre_beca
                      +`
                      </p>
                    <hr/>
                  <p class="p2">Has ganado la <br>  
                  `+
                      data[key].nombre_beca
                   +`
                      <br>en subcategoría 
                  `+
                      data[key].tipo_premio
                   +` 
                      <br>que corresponde a un estímulo 
                      en dinero de
                  </p>
                  <h3>
                  `+
                      data[key].premio
                   +`
                  </h3>
                  <span class="card-title activator "><i class="material-icons right top">more_vert</i></span>
                </div>
                <div class="card-reveal">
                  <span class="card-title"> <i class="material-icons right">close</i> <br></span>
                  <p class="p3">`+
                      //data[key].mensaje
                      aux2
                   +`
                  </p>
                </div>
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="assets/color.svg">
                </div>
              </div>
            </div>
          `;
        }else if (data[key].tiene_premio == " No" || data[key].tiene_premio == "No" || data[key].tiene_premio == "NO" || data[key].tiene_premio == " no"){
          console.log("a2:",parseInt(key)%2);
          console.log("b2:",data.length);
          if(parseInt(key)%2 == 0  && (parseInt(key) == data.length -1)){
            aux += `
                <div  class="col s12 m6 offset-m3 cardCol">
                `;
          }else{
             aux += `
                <div  class="col s12 m6 cardCol">
                `;
          }
          aux += `
             <div class="card">
              <div class="card-content">
                <span class="card-title activator loser">¡Inténtalo el próximo año!</span>
                <p class="p11">
                `+
                   data[key].nombre_postulante 
                +`
                <br>
                `+
                 data[key].apellidos_postulante
                +`
                <br> 
                `+
                   data[key].nombre_beca
                +`
                </p>
              </div>
              
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="assets/color.svg">
              </div>
            </div>
          </div>
          `; 
        }     
      }

      loadBanner();
      hideItems();

      document.getElementById('addResultados').innerHTML = ` 
        <div class="row">`+
        aux
        + `</div>
      `; 

     }
   })
}


function paginaUno() {

     document.getElementById('addPhoto').innerHTML = ` 

        <div id="divCenterH3" class="col s12 text-center center-align " style="height: auto; width: 100%;padding-top:50px;" >
          <img src="assets/title.svg" style="width:70%;">
        </div> 
         <div id="divCenterH3" class="col s12 text-center center-align hide-on-med-and-up" style="height: auto; width: 100%; padding-top:20px;" >
          <img src="assets/item2.svg" style="width:75%;">
        </div>
        <div id="divCenterH3" class="col s12 text-center center-align hide-on-small-only" style="height: auto; width: 100%; padding-top:20px;" >
          <img src="assets/item1.svg" style="width:95%;">
        </div>  

    `;

    document.getElementById('addSearch').innerHTML = ` 

        <div class="row"  style="border: 1px solid #E7E7E7 !important; margin:10px; ">
          <div class="col s3 m2 right-align">
          <p style="color: #999999; padding-top:0px;"> * Rut </p>
          </div>
          <div class="col s9 m10 input-field left-align" style="margin-top:0px;">
            <input id="rut" type="text" class="validate valid" style="margin:0px;">
          </div>
          
        </div>
  
    `;
      document.getElementById('addBtn').innerHTML = ` 

        <div id="fieldNone" class="modal">
            <p style="text-align: center;">Estimado tu rut no ha sido registrado en el sistema de Becas La Araucana 2018.</p>
        </div>

        <div id="fieldRutMalo" class="modal">
            <p style="text-align: center;">Estimado ingrese un rut válido.</p>
        </div>
       
    
        <div class="col s12 center-align" style="margin-top:10px;">
          <button id="btnSend" style="background-color:transparent;border-color: transparent; ">
            <img src="assets/btn.svg" style="width:220px;" >
          </button>
          
       </div>

        <div id="divCenterH3" class="col s12 text-center center-align " style="height: auto; width: 100%; margin-top:50px;" >
          <img src="assets/footer.svg" style="width:40%;  min-width: 300px;">
        </div> 
  
    `;
            
    $('#rut').keydown(function(e) {
        if (e.keyCode == 13) {
            btnBuscar();
        }
    });

     $('#btnSend').click(function(){
      btnBuscar();
     });

/*
    $('#fieldGood').find('#close-modal').click(function(event){
        event.preventDefault();
        location.reload();
        console.log('hola');
    });
*/

}

function btnBuscar(){
    var rut = $('#rut').val();
    console.log("rut: ",rut);

    if ( rut == "" ){
       console.log("vacio ");  
      // alert("Debes Completar los campos pedidos");
      // $('#fotoNone').modal('open');

    }else {
        rut = $.rut.formatear(rut) ;
        console.log("rut formatear: ",rut);
        var es_valido = $.rut.validar(rut);

        if (es_valido ){
           //alert('rut  y email valido');
           console.log("rut ok:",es_valido);
           rut = rut.replace(/\./g,'');
           console.log("load(rut):",rut);
           load(rut);

        }else if (!es_valido){
           console.log("rut malo:",es_valido);
           $('#fieldRutMalo').modal('open');

        }


    }
}



