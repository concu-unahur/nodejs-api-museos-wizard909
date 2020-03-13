const superagent = require('superagent');
const fs = require('fs');

function traerMuseosDeLaAPI(){
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/museos')
    .query({ format: 'json' })
    .end(escribirDatosDeMuseos)
}
function traerOrganismosDeLaAPI(){
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/organismos/')
    .query({ format: 'json' })
    .end(escribirDatosDeOrganismos)
}

function escribirDatosDeMuseos(error, respuesta){
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;
  var listaMuseos = [`Se encontraron ${cantidad} museos: \n \n`]
  var i = 0;

  for (const m of museos){
    listaMuseos.push(`${i+1} ° ${m.nombre}(${m.direccion}). Por cualquier consulta comunicarse al ${m.telefono}. \n`);
    i++
  }
  i = 0

  fs.writeFile('museos.txt', listaMuseos.join(""), despuesDeEscribir)
}

function escribirDatosDeOrganismos(error, respuesta){
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const organismos = respuesta.body.results;
  var listaOrganismos = [`Se encontraron ${cantidad} organismos: \n \n`]
  var i = 0;

  for (const o of organismos){
    listaOrganismos.push(`Organismo ${i+1} °: ${o.nombre}(${o.direccion}). Por cualquier consulta comunicarse al ${o.telefono}. \n`);
    i++
  }
  i = 0

  fs.writeFile('organismos.txt', listaOrganismos.join(""), despuesDeEscribir)
}

function despuesDeEscribir(error) {
  if (error) {
    throw new Error('algo se rompió, no se puedo escribir', error);
  }

  console.log("Termine de escribir")
}

traerMuseosDeLaAPI();
traerOrganismosDeLaAPI();