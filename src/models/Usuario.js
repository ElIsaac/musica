const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  contrasenia: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

UsuarioSchema.methods.encriptacion = async contrasenia => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(contrasenia, salt);
};

UsuarioSchema.methods.matchPassword = async function(contrasenia) {
  return await bcrypt.compare(contrasenia, this.contrasenia);
};

module.exports = model("Usuario", UsuarioSchema);
