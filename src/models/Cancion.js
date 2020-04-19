const { Schema, model } = require("mongoose");


const TrabajoSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    usuario: {
      type: String,
      required: true
    } 
  },
  {
    timestamps: true
  }
);

module.exports = model("Trabajo", TrabajoSchema);