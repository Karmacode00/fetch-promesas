//console.log("Holo"); Esto se ejecuta primero
//window.onload = function () => {
  //console.log("Holi Holi"); Esto se ejecuta tercero, al final de la carga de la pagina
//};

//console.log("Holo2"); Esto se ejecuta segundo

/* window.onload = () => {

};
//La función puede ser llamada desde cualquier parte
//Queda definida en javascript
//Arrow function es una asignación, sólo de lo que está dentro de ella
function obtenerDoges () {

}

function obtenerGatos () {

}
*/
window.onload = () => {
  dogesYCatesEnParalelo();
};

//La función puede ser llamada desde cualquier parte
function obtenerDoges() {
  var xhttp = new XMLHttpRequest(); //Objeto que representa la petición (request)
  xhttp.onreadystatechange = () => { //Evento cuando el estado haya cambiado (cuando esté listo) Se ejecutará cuando esté lista, cuando reciba la respuesta
    if (xhttp.readyState == 4 && xhttp.status == 200) { //Todas las respuestas “200 y algo” serán respuestas satisfactorias
      const dogeResponse = JSON.parse(xhttp.responseText); //No usar funciones flechas cuando usamos this.  usar json punto stringify cuando tratemos con objetos 
      const dogeReceptorDiv = document.getElementById("dogeReceptor");
      for (let dogeIndex = 0; dogeIndex < dogeResponse.length; dogeIndex++) {
        const dogeImg = document.createElement('img'); //Aquí "almaceno" las imágenes
        dogeImg.src = dogeResponse[dogeIndex];
        dogeReceptorDiv.appendChild(dogeImg);
      }
    }
  };
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true", true); //Con GET sólo se accede a datos, NO se envían (Cuando se hace Login, se debería hacer con POST, no con GET). Va el verbo (GET) y luego la petición (URL)
  xhttp.send(); //Aquí se ejecuta la petición

  /*
   * Podemos seguir ejecutando código acá mientras esperamos la respuesta
   */
  console.log("Holi soy doge");
};
// Acá vamos a poner la función para obtener info de gatos con fetch
function obtenerGatos() {
  //Fetch retorna una promesa
  fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true`)
  .then((response) => { //Fetch no falla cuando no recibe información del servidor
    //Este then es de la promesa del fetch
    if(response.ok){
      return response.json();
    } else {
      throw new Error ("Mala respuesta de gatitos");
    }
  }).then((catesJson) => { //En este punto recibimos el JSON
    //Este then es de la promesa de response.json()
    console.log("JSON recibido >" + JSON.stringify(catesJson));
    const cateReceptorDiv = document.getElementById("cateReceptor");
    for (let cateIndex = 0; cateIndex < catesResponse.length; cateIndex++) {
      const cateImg = document.createElement('img'); //Aquí "almaceno" las imágenes
      cateImg.src = catesJson[cateIndex];
      cateReceptorDiv.appendChild(cateImg);
    }
  })
  .catch((error) => {
    console.error("Holi soy un error " + error)
  });
}

functiondogesYCatesEnParalelo () {
  Promise.all([
    fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true`),
    fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true`)
  ]).then((responses)=> {
    return Promise.all(
      responses.map(
        (response)=>{
          return response.json();
        }
      )
    );
  }).then((catesDogesJson) => {
    console.log("Respuesta en paralelo > "+JSON.stringify(catesDogesJson));
  }).catch ((error) => {

  });
}