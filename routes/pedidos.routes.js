const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");

module.exports = () => {
  router.post("/pedidos", pedidosController.nuevoPedido);
  router.get("/pedidos", pedidosController.getPedidos);
  router.get("/pedidos/:id", pedidosController.getPedidoId);
  router.put("/pedidos/:id", pedidosController.updatePedido);
  router.delete("/pedidos/:id", pedidosController.deletePedido);

  return router;
};

