const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientesSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  edad: {
    type: Number,
    trim: true,
    min: 0,
    max: 100,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("Clientes", clientesSchema);
