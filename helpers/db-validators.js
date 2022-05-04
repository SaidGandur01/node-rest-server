const Role = require("../models/role.model");
const Usuario = require("../models/usuario.model");

const isRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`EL correo ${correo} ya se encuentra registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe.`);
  }
};

module.exports = {
  isRoleValido,
  emailExiste,
  existeUsuarioPorId,
};
