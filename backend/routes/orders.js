const {
  createOrder,
  getMeta,
  getOrder,
  getOrders,
  deleteOrder,
  updateOrder,
  totalOrder,
  deleteAll,
} = require("../controllers/orders");

const router = require("express").Router();

router.get("/orders", getOrders);
router.get("/orders/:id", getOrder);
router.post("/orders", createOrder);
router.get("/orders/meta", getMeta);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);
router.get("/orders/count", totalOrder);
router.get("/delete-many-orders", deleteAll);

module.exports = router;
