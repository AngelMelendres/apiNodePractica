const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

module.exports = () => {
  router.post("/clientes", clienteController.nuevoCliente);
  router.get("/clientes", clienteController.getClientes);
  router.get("/clientes/:id", clienteController.getClienteId);
  router.put("/clientes/:id", clienteController.updateCliente);
  router.delete("/clientes/:id", clienteController.deleteCliente);

  return router;
};
