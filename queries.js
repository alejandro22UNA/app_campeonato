var conexion = require('./connection');
var jwt = require('jsonwebtoken');

function MetodosDB() {
   
   this.jornadas = function(respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query(`SELECT  id_equipo_local AS EQUIPO_LOCAL, id_equipo_visita AS EQUIPO_VISITA,
goles_local AS GOLES_LOCAL, goles_visita AS GOLES_VISITA,
fecha as FECHA,jornada AS JORNADA ,
estado_jornada AS ESTADO_JORNADA,
tbl_info_partido.codigo_partido AS CODIGO_PARTIDO
FROM tbl_jornada AS JORNADAS INNER JOIN tbl_info_partido 
ON JORNADAS.jornada = (SELECT jornada FROM tbl_jornada AS JORNADA
where JORNADA.codigo_partido = (SELECT MAX(tbl_jornada.codigo_partido) from tbl_jornada WHERE tbl_jornada.estado_jornada = 1))
WHERE JORNADAS.codigo_partido = tbl_info_partido.codigo_partido;`, function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' })
            } else {
               respuesta.send(resultado);
               
            }
         })
      }) 
   }
   this.tabla_posiciones = function(respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('select * from Tabla_posiciones', function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' })
            } else {
               respuesta.send(resultado);
            }
         })
      }) 
   }

     this.primera_posicion = function(respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('select * from Tabla_posiciones limit 1', function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' })
            } else {
               respuesta.send(resultado);
            }
         })
      }) 
   }
   this.seleccionarJornada = function(numero_jornada, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query(`SELECT id_equipo_local AS EQUIPO_LOCAL, id_equipo_visita AS EQUIPO_VISITA,
goles_local AS GOLES_LOCAL, goles_visita AS GOLES_VISITA,
fecha as FECHA,
jornada AS JORNADA,
estado_jornada AS JORNADA_ESTADO,
info_partido.codigo_partido AS CODIGO_PARTIDO
   FROM bd_campeonato.tbl_jornada AS tbl_jornada   
   INNER JOIN bd_campeonato.tbl_info_partido AS info_partido
    ON tbl_jornada.codigo_partido = info_partido.codigo_partido
   WHERE jornada = ?`,numero_jornada, function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error'});
            } else {
               respuesta.send(resultado);
            }
         })
      })
   }
      this.seleccionarPartido = function(numeroPartido, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query(`SELECT id_equipo_visita AS EQUIPO_VISITA,
id_equipo_local AS EQUIPO_LOCAL,
goles_local AS GOLES_LOCAL,
goles_visita AS GOLES_VISITA,
fecha AS FECHA,
jornada AS JORNADA,
INFO_PARTIDO.codigo_partido AS CODIGO_PARTIDO
FROM tbl_jornada AS JORNADA
INNER JOIN tbl_info_partido AS INFO_PARTIDO
ON JORNADA.codigo_partido = INFO_PARTIDO.codigo_partido
AND INFO_PARTIDO.CODIGO_PARTIDO = ?`,numeroPartido, function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error'});
            } else {
               respuesta.send(resultado);
            }
         })
      })
   }

   this.insertar = function(datos, respuesta) {
      conexion.obtener(function(er, cn){
         cn.query('CALL InsertarGoles(?,?,?);', datos, function(error, resultado){
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

      this.actualizar_goles = function(datos, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('CALL InsertarGoles(?,?,?)', datos, function(error, resultado){
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

     this.actualizar_fecha = function(datos, respuesta) {
      console.log(datos);
      conexion.obtener(function(er, cn) {
         cn.query(`UPDATE tbl_jornada 
    SET tbl_jornada.fecha = ?
    WHERE tbl_jornada.codigo_partido = ? ;`,datos, function(error, resultado){
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error'});

            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }
     this.finalizar_partido = function(datos, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('CALL FinalizarPartido(?,?,?,?,?)', datos, function(error, resultado){
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

   

   this.actualizar = function(datos, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('update inventario set ? where id = ?', [datos, datos.id], function(error, resultado){
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

   this.borrar = function(id, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('delete from inventario where id = ?', id, function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

   this.login = function(datos, respuesta) {

      conexion.obtener(function(er, cn) {
         cn.query('select * from usuarios where user=? and pass=?',[datos.user, datos.pass], function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send('error');
            } else {
               if (resultado.length == 0) {
                  console.log('No se encuentra el usuario');
                  respuesta.send('nofound');
               } else {
                  var token = jwt.sign({
                     user: datos.user,
                     rol: 'admin'
                  },'secreto',{expiresIn: '120s'});
                  respuesta.send(token);
               }
            }
         })
      })
   }
   this.root = function(req, res) {
      // body...
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Servidor Node Funcionado correctamente :');
        console.log('APP FUNCIONANDO');
   
   
}

}
module.exports = new MetodosDB();