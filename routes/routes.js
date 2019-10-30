var db = require('../queries');

function http() {
   this.configurar = function(app) {
    
    app.get("/", function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Servidor Node Funcionado correctamente :)');
        console.log('APP FUNCIONANDO');
    });
      
      app.get('/jornada/', function(solicitud, respuesta) {
         db.jornadas(respuesta);
      })
      app.get('/tabla_posiciones/', function(solicitud, respuesta) {
         db.tabla_posiciones(respuesta);
      })
       app.get('/primera_posicion/', function(solicitud, respuesta) {
         db.primera_posicion(respuesta);
      })

      app.get('/jornadas_numero/:numero_jornada/', function(solicitud, respuesta) {
         db.seleccionarJornada(solicitud.params.numero_jornada, respuesta);
      })

        app.get('/partido/:numeroPartido/', function(solicitud, respuesta) {
         db.seleccionarPartido(solicitud.params.numeroPartido, respuesta);
      })

      // app.post('/insertar_goles/', function(solicitud, respuesta) {
      //    db.insertar(solicitud.body, respuesta);
      // })

      app.put('/insertar_goles/', function(solicitud, respuesta) {
         db.actualizar_goles(solicitud.body, respuesta);
      })
        app.put('/insertar_fecha/', function(solicitud, respuesta) {
         db.actualizar_fecha(solicitud.body, respuesta);
      })
        app.put('/finalizar_partido/', function(solicitud, respuesta) {
         db.finalizar_partido(solicitud.body, respuesta);
      })

      app.put('/inventario/', function(solicitud, respuesta) {
         db.actualizar(solicitud.body, respuesta);
      })

      app.delete('/inventario/:id/', function(solicitud, respuesta) {
         db.borrar(solicitud.params.id, respuesta);
      })

      app.post('/auth/login/',function(solicitud, respuesta){
         db.login(solicitud.body, respuesta);
      })

   }  
}

module.exports = new http();