import { useState, useEffect } from "react";
import useQueryHook from "@/customhooks/useQuery";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Products = () => {
  const [cartItems, setCartItems] = useState([]);

  const { data: products } = useQueryHook({
    endpoint: "products",
    querykey: ["products"],
  });

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

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.post(
        "http://localhost:5000/cart/add",
        { productid: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems([...cartItems, { productId: product._id, quantity: 1 }]);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateQuantity = async (productId, action) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        "http://localhost:5000/cart/update", // ✅ Single API call
        { productId, action }, // ✅ Send action ('increase' or 'decrease')
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems(
        (prevCart) =>
          prevCart
            .map((item) =>
              item.productId === productId
                ? {
                    ...item,
                    quantity:
                      action === "increase"
                        ? item.quantity + 1
                        : Math.max(0, item.quantity - 1),
                  }
                : item
            )
            .filter((item) => item.quantity > 0) // ✅ Remove item if quantity is 0
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.delete(`http://localhost:5000/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prevCart) =>
        prevCart.filter((item) => item.productId !== productId)
      );
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {products?.map((product) => {
          const cartItem = cartItems.find(
            (item) => item.productId === product._id
          );
          return (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-md bg-white w-64 text-center"
            >
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
              <div className="mt-4 flex flex-col gap-2">
                {cartItem ? (
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onClick={() => updateQuantity(product._id, "decrease")} // ✅ Uses action
                      className="bg-gray-500 text-white px-3 py-2"
                    >
                      -
                    </Button>

                    <span className="text-lg font-semibold">
                      {cartItem.quantity}
                    </span>

                    <Button
                      onClick={() => updateQuantity(product._id, "increase")} // ✅ Uses action
                      className="bg-gray-700 text-white px-3 py-2"
                    >
                      +
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => addToCart(product)}
                    className="bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Add to Cart
                  </Button>
                )}
                {cartItem && (
                  <Button
                    onClick={() => removeFromCart(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
