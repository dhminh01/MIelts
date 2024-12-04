"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "@/components/payment/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const MeetingPage = () => {
  const [amount, setAmount] = useState(0.99); // Giá trị mặc định

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount(0); // Khi giá trị rỗng, đặt amount về 0
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setAmount(parsedValue);
      }
    }
  };

  return (
    <main className="max-w-6xl p-10 m-10 mx-auto text-center text-white border rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-extrabold">MIelts</h1>
        <h2 className="mb-4 text-2xl">Enter the amount to pay:</h2>
        <input
          type="number"
          step="0.01"
          className="p-2 mb-4 text-black rounded-md"
          value={amount}
          onChange={handleAmountChange}
        />
        <h2 className="text-2xl">
          You are paying:
          <span className="font-bold"> ${amount.toFixed(2)}</span>
        </h2>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
};

export default MeetingPage;
