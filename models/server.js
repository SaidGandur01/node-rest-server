const cors = require("cors");
const express = require("express");
const { dbConnection } = require("../database/config.db");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // Conectar a base de datos.
    this.conectarDB();

    // Middleware => Funcion que siempre va a ejecutarse cuando levantemos el servidor.
    this.middlewares();

    // Rutas de mi aplicación.
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body.
    this.app.use(express.json());
    // Directorio público.
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: ", this.port);
    });
  }
}

module.exports = Server;
