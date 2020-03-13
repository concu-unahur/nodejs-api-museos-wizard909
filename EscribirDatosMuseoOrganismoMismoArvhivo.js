const superagent = require('superagent');
const fs = require('fs');

traerMuseosDeLaAPI();

function traerMuseosDeLaAPI(descargandoMuseos){
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/museos')
    .query({ format: 'json' })
    .end(escribirDatosDeMuseos)
    descargandoMuseos("descargando museos");

  function descargandoMuseos(descargandoMuseos){
    console.log(descargandoMuseos)
  }
}
function traerOrganismosDeLaAPI(descargandoOrganismos){
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/organismos/')
    .query({ format: 'json' })
    .end(escribirDatosDeOrganismos)

  descargandoOrganismos("descargando organismos");

  function descargandoOrganismos(descargandoOrganismos){
    console.log(descargandoOrganismos)
  }
}

function escribirDatosDeMuseos(error, respuesta, escribiendoMuseos){
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

  escribiendoMuseos("escribiendo museos en archivo");
  function escribiendoMuseos(escribiendoMuseos){
    console.log(escribiendoMuseos)
  }

  fs.writeFile('museosYorganismos.txt', listaMuseos.join(""), verificarMuseo)
}

function escribirDatosDeOrganismos(error, respuesta, escribiendoOrganismos){
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

  escribiendoOrganismos("escribiendo organismos en archivo");
  function escribiendoOrganismos(escribiendoOrganismos){
    console.log(escribiendoOrganismos)
  }

  fs.appendFile('museosYorganismos.txt', listaOrganismos.join(""), verificarOrganismo)
}

function verificarMuseo(error) {
  if (error) {
    throw new Error('algo se rompió, no se pudo escribir', error);
  }

  console.log("Termine de escribir Museos")
  traerOrganismosDeLaAPI();
}

function verificarOrganismo(error, ejecuciónFinalizada) {
  if (error) {
    throw new Error('algo se rompió, no se pudo escribir', error);
  }

  console.log("Termine de escribir organismos")

  ejecucionFinalizada("ejecucion finalizada");
  function ejecucionFinalizada(ejecucionFinalizada){
    console.log(ejecucionFinalizada)
  }
}
