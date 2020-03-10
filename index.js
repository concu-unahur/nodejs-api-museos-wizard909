const superagent = require('superagent');
const fs = require('fs');

function escribirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;
  

  console.log(`Se encontraron ${cantidad} museos.`);

  for (i=0; i<cantidad ;i++){
    console.log(`Museo ${i} escrito.`)
    fs.writeFile('museos.txt', `${museos[i].nombre}( 
      ${museos[i].direccion}). Por cualquier consulta comunicarse al 
      ${museos[i].telefono}. \n`, despuesDeEscribir);
}

function despuesDeEscribir(error) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  console.log("Termine de escribir")
}

superagent
.get('https://www.cultura.gob.ar/api/v2.0/museos')
.query({ format: 'json' })
.end(escribirMuseos)
