"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useSession } from "next-auth/react";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  useEffect(() => {
    // Fetch wallet balance on load
    if (userId) {
      fetch(`/api/payment/get-wallet-amount`, {
        method: "GET",
        headers: {
          "user-id": userId,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setWalletBalance(data.wallet);
          } else {
            setErrorMessage(data.error);
          }
        })
        .catch((error) => {
          console.error("Error fetching wallet balance:", error);
          setErrorMessage("Failed to load wallet balance.");
        });
    }
  }, [userId]);

  useEffect(() => {
    // Fetch the PaymentIntent client secret
    fetch("/api/payment/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error("Error fetching payment intent:", error);
        setErrorMessage("Failed to create payment intent.");
      });
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not initialized. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      // Submit elements to validate fields
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      } else {
        if (userId) {
          try {
            const response = await fetch("/api/payment/update-wallet", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                amount,
              }),
            });

            const data = await response.json();
            if (!response.ok) {
              throw new Error("Failed to update wallet");
            }

            console.log("Wallet updated successfully:", data);

            // Update the UI with the new wallet balance
            if (data.success) {
              setWalletBalance(data.wallet.amount); // Update wallet balance in UI
            }
          } catch (walletError) {
            console.error("Error updating wallet:", walletError);
            setErrorMessage("Payment succeeded, but updating wallet failed.");
          }
        } else {
          console.error("User ID is not available.");
          setErrorMessage("Payment succeeded, but user identification failed.");
        }
      }

      // Confirm payment with Stripe
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://www.localhost:3000/user-profile/payment/payment-success?amount=${amount}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      // Update wallet after successful payment
    } catch (paymentError) {
      console.error("Error processing payment:", paymentError);
      setErrorMessage("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="wallet-balance">
        <h3>Current Wallet Balance: ${walletBalance ?? "Loading..."}</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded-md shadow-md"
      >
        {clientSecret && <PaymentElement />}

        {errorMessage && (
          <div className="mt-2 text-red-500">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <button
          disabled={!stripe || loading}
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-md disabled:opacity-50 disabled:animate-pulse"
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </button>

        {!clientSecret && (
          <div className="flex items-center justify-center mt-4">
            <div
              className="inline-block w-8 h-8 border-4 border-current border-solid rounded-full animate-spin border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutPage;
