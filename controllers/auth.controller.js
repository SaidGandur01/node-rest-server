const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario.model");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el correo exite
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // Verificar si el usuario esta activo en la DB
    if (!usuario.estado) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs;

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
