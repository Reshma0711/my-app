const express = require("express");
const router = express.Router();
const {
  userCart,
  add,
  delProduct,
  decPrdCount,
  delCart,
//   testCart,
  updateQuantity,
} = require("../controllers/cart");
const { verifyToken } = require("../middlewares/authmiddleware");
// const { verifyRole } = require("../middlewares/rolemiddleware");

// Get user's cart (Only users)
router.get("/", verifyToken,  userCart);

router.post("/add",verifyToken, add);

router.post("/update",verifyToken, updateQuantity)

router.delete("/:id", verifyToken, delProduct);

router.patch("/decrease/:id", verifyToken,  decPrdCount);

router.delete("/", verifyToken, delCart);

// router.post("/test",verifyToken,verifyRole(["user"]), testCart);

module.exports = router;




