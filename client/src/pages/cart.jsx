import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { createOrder, verifyPayment } from "../services/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartItems(response.data.cart?.products || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  // Calculate grand total when cart items change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    setAmount(total);
  }, [cartItems]);

  console.log("Cart Items:", cartItems);

  // Handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
  
      console.log("Initiating order creation...");
  
      // ❌ Do not send 'amount' from frontend (backend will calculate)
      const orderData = await createOrder(); 
  
      console.log("Order Data Received:", orderData);
  
      if (!orderData || !orderData.order) {
        alert("Failed to create order");
        setLoading(false);
        return;
      }
  
      const options = {
        key: "rzp_test_qpA16uqhKeWAIJ",
        amount: orderData.order.amount, // Backend-calculated amount
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: "My E-Commerce Store",
        description: "Payment for order",
        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  
          const verifyData = { razorpay_order_id, razorpay_payment_id, razorpay_signature };
          const result = await verifyPayment(verifyData);
  
          if (result.message === "Payment captured successfully") {
            alert("Payment Successful!");
            navigate(`/success-page?payment_id=${razorpay_payment_id}&order_id=${razorpay_order_id}`);
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: { name: "John Doe", email: "john@example.com", contact: "9999999999" },
        notes: { address: "My E-Commerce Store, India" },
        theme: { color: "#3399cc" },
      };
  
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Error while initiating payment");
    } finally {
      setLoading(false);
    }
  };
  

  // Update item quantity
  const updateQuantity = async (productId, action) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.post(
        "http://localhost:5000/cart/update",
        { productId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item.productId._id === productId
              ? {
                  ...item,
                  quantity:
                    action === "increase"
                      ? item.quantity + 1
                      : Math.max(1, item.quantity - 1), // Prevent going below 1
                }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.delete(
        `http://localhost:5000/cart/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setCartItems((prevCart) =>
          prevCart.filter((item) => item.productId._id !== productId)
        );
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // Clear all cart items
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.delete("http://localhost:5000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Shopping Cart 🛒
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-md">
          {cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="border-b py-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item.productId.name}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item.productId.price} each
                </p>
                <p className="text-sm font-bold text-gray-800">
                  Total: ₹{(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => updateQuantity(item.productId._id, "decrease")}
                  className="bg-gray-500 text-white px-2 py-1"
                  disabled={item.quantity === 1} // Disable "-" if quantity is 1
                >
                  -
                </Button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <Button
                  onClick={() => updateQuantity(item.productId._id, "increase")}
                  className="bg-gray-700 text-white px-2 py-1"
                >
                  +
                </Button>
                <Button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  ❌
                </Button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold mt-4">
            Grand Total: ₹{amount.toFixed(2)}
          </div>

          <Button
            onClick={clearCart}
            className="bg-red-600 text-white w-full mt-4 py-2"
          >
            Clear Cart
          </Button>

          <Button
            onClick={handlePayment}
            className="bg-green-600 text-white w-full mt-4 py-2"
            disabled={loading || amount <= 0}
          >
            {loading ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
