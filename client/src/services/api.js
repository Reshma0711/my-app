import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Ensure this matches your backend

export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_BASE_URL}/create-order`, orderData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    return response.data; // Return order data
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};

export const verifyPayment = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-capture`, data);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };
