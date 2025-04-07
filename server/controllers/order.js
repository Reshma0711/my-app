const Cart = require("../model/cart");
const Order = require("../model/order");
const Payment = require("../model/payment");
const { razorpay } = require("../utils/razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");

exports.createOrder = async (req, res) => {
  try {
    const userid = new mongoose.Types.ObjectId(req.user.id);

    console.log("User Info:", req.user);
    console.log("Request Body:", req.body);

    console.log("yyyyyyyyyyyyyyyyyyy", userid);

    // 1️⃣ Aggregate to get cart with populated products and total sum
    const cartAggregation = await Cart.aggregate([
      { $match: { userId: userid } }, // Match the user's cart
      {
        $unwind: "$products", // Deconstructs the products array
      },
      {
        $lookup: {
          from: "products", // Assuming "products" is the name of the collection
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Deconstructs the productDetails array
      },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: {
              productId: "$productDetails._id",
              price: "$productDetails.price",
              quantity: "$products.quantity",
            },
          },
          totalAmount: {
            $sum: {
              $multiply: ["$productDetails.price", "$products.quantity"],
            },
          },
        },
      },
    ]);

    if (!cartAggregation.length) {
      return res.status(400).json({ error: "Cart is empty or not found." });
    }

    const cart = cartAggregation[0];

    console.log("Calculated Cart Total:", cart.totalAmount);

    console.log(typeof cart.totalAmount);

    // 3️⃣ Configure options for Razorpay order
    const options = {
      amount: cart.totalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);

    // 4️⃣ Create order in Razorpay
    const order = await razorpay.orders.create(options);

    // 5️⃣ Save order to DB
    const newOrder = new Order({
      userId: userid,
      order_id: order.id,
      amount: order.amount / 100, // Convert back to original amount
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
      items: cart.products,
    });

    await newOrder.save();

    res.status(200).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: err.message });
  }
};

// Verify and capture payment
exports.verifyCapture = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Generate signature for verification
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    console.log("Expected signnnnnnnnnnnnn", expectedSign);
    console.log("RazorPay Signatureeeeeeeeeeee", razorpay_signature);

    const isAuth = razorpay_signature === expectedSign;

    // Verify the signature
    if (!isAuth) {
      return res.status(400).json({ message: "Invalid Signature" });
    }

    // Check payment status
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    if (paymentDetails.status === "captured") {
      // Save payment details to DB
      const newPayment = new Payment({
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        signature: razorpay_signature,
        status: "captured",
        amount: paymentDetails.amount,
        method: paymentDetails.method,
      });

      await newPayment.save();

      // Update order status to 'paid'
      await Order.findOneAndUpdate(
        { order_id: razorpay_order_id },
        { status: "paid" }
      );

      res.status(200).json({
        message: "Payment captured successfully",
        paymentDetails,
      });
      // res.redirect(
      //   `http://localhost:5174/payment-success?payment_id=${razorpay_payment_id}&order_id=${razorpay_order_id}`
      // );
    } else {
      res.status(400).json({ message: "Payment not captured" });
    }
  } catch (error) {
    console.error("Error in verification", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
