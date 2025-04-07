const Product = require("../model/products");
const Cart = require("../model/cart");
const mongoose = require("mongoose"); // Make sure mongoose is imported

// Get user's cart (Only users)
exports.userCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );
    res.status(200).json({ cart });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};
    
//add a product into cart
exports.add = async (req, res) => {
  try {
    const { id } = req.user; // User ID from auth middleware
    const { productid, quantity } = req.body; // Product details from request body
    console.log("bbbbbbbbbbbbbb", req.body);
    if (!mongoose.Types.ObjectId.isValid(productid)) {
       
      return res.status(400).json({
        message: "Invalid product ID format",
        success: false,
      });
    }


    console.log("testtttttttttttt")
    // Find the product by id
    const product = await Product.findOne({ _id: productid });
    
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    const productId = product._id;

    // console.log("foundddddddddddddddddd",productId)

    // Find the user's cart
    let existingCart = await Cart.findOne({ userId: id });

    console.log("testttttttttttttttttttttttt",existingCart)

    if (existingCart) {
      // Check if the product already exists in the cart
      const existingCartProduct = existingCart.products.find(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingCartProduct) {
        // If product exists, update its quantity
        existingCartProduct.quantity += quantity;
      } else {
        // If product doesn't exist, add a new product to the cart
        existingCart.products.push({ productId, quantity });
      }
     
      await existingCart.save();
    } else {
      // If the cart doesn't exist, create a new cart
      existingCart = new Cart({
        userId: id,
        products: [{ productId, quantity }],
      });
    
        //  console.log("sampleeeeeeeeeeeeeeeeeee",existingCart)

      await existingCart.save();
    }

    res.status(200).json({
      message: "Cart updated successfully",
      success: true,
      cart: existingCart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};



//delete a whole cart items
exports.delCart = async (req, res) => {
    const { id } = req.user; // Extract user ID from token

    console.log("reqqqqqqqqqqqqqqqqqqqqqqqqqqqq",id)

    try {
        const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(id) }); // Find user's cart
        console.log(cart)

        if (!cart) {
            return res.status(404).json({ success: false, message: "No cart items found to delete" });
        }

        const value=await Cart.deleteMany({ userId: id }); // Delete user's cart items

        console.log("valueeeeeeeeeeeeeeeeeeeeeeeeeeeee",value)
       
        res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// delete a product in cart
exports.delProduct = async (req, res) => {
  const { id: productId } = req.params;
  console.log("productId", productId);
  const { id: userId } = req.user;
  try {
    const userCart = await Cart.findOne({ userId: userId });
    // Filter out the product and reassign the products array
    userCart.products = userCart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    console.log("user cart", userCart);
    await userCart.save();
    // const cart = await Cart.find();
    res
      .status(200)
      .json({ message: "Product removed from cart", success: true, userCart });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.updateQuantity = async (req, res) => {
    const { productId, action } = req.body; // ✅ Get action ('increase' or 'decrease')
    const { id: userId } = req.user;
  
    try {
      const userCart = await Cart.findOne({ userId });
  
      if (!userCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const item = userCart.products.find(
        (item) => item.productId.toString() === productId
      );
  
      if (!item) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      if (action === "increase") {
        item.quantity += 1; // ✅ Increase quantity
      } else if (action === "decrease") {
        if (item.quantity > 1) {
          item.quantity -= 1; // ✅ Decrease quantity
        } else {
          // Remove product if quantity becomes zero
          userCart.products = userCart.products.filter(
            (item) => item.productId.toString() !== productId
          );
        }
      }
  
      await userCart.save();
  
      res.status(200).json({
        message: `Product ${action}d successfully`,
        success: true,
        cart: userCart,
      });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  };
  



// decrease product count
exports.decPrdCount = async (req, res) => {
  const { id } = req.user;
  const { id: productId } = req.params;

  //   console.log("userId",id);
  //   console.log("Product from query",productId);
  try {
    const userCart = await Cart.findOne({ userId: id });
    // console.log("userCart",userCart)
    // console.log(userCart.products)
    userCart.products = userCart.products
      .map((item) => {
        // console.log(typeof(item.productId))
        // console.log(item.productId.toString())
        // console.log(productId)
        // console.log(item.productId.toString()===productId)
        if (item.productId.toString() === productId) {
          // console.log("quantity",item.quantity)
          if (item.quantity) item.quantity--;

          //   console.log(item.quantity)
        }
        return item;
      })
      .filter((item) => item.quantity >= 1);
    await userCart.save();
    res.status(201).json({
      message: "Product quantity decreased",
      success: true,
      userCart,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};