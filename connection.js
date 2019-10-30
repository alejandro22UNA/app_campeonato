var mysql = require('mysql');

function Conexion(){
   this.pool = null;

   this.inicia = function() {
      this.pool = mysql.createPool({
         connectionLimit: 10,
         host: '185.201.10.115',
         user: 'u821432223_user00 ',
         password: '4gxBJ7Kmi:j4JD1v',
         database: 'u821432223_campeonato'
      })
   }

   this.obtener = function(callback) {
      this.pool.getConnection(function(error, connection){
         callback(error, connection);
      })
   }
}

module.exports = new Conexion();
