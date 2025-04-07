import React from "react";
import { useSearchParams, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="border rounded-lg shadow-md p-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">🎉 Payment Successful! 🎉</h2>
        <p className="mb-2">Thank you for your purchase. Your payment was successful.</p>
        {paymentId && <p className="mb-1"><strong className="font-medium">Payment ID:</strong> {paymentId}</p>}
        {orderId && <p className="mb-3"><strong className="font-medium">Order ID:</strong> {orderId}</p>}
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;