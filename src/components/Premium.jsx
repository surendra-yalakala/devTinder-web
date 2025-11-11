import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = React.useState(false);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {}
  };

  const buyPremium = async (plan) => {
    try {
      const order = await axios.post(
        BASE_URL + "/premium/create",
        { membershipType: plan },
        { withCredentials: true }
      );
      const { amount, keyId, currency, notes, orderId } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Error premium api :: ", error);
    }
  };
  return isUserPremium ? (
    "You're are already a premium user"
  ) : (
    <div className="flex w-full flex-col lg:flex-row justify-center gap-4 p-4">
      <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
        Silver Plan
        <button
          className="btn btn-primary btn-sm mt-2"
          onClick={() => buyPremium("silver")}
        >
          Choose Silver
        </button>
      </div>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
        Gold Plan
        <button
          className="btn btn-secondary btn-sm mt-2"
          onClick={() => buyPremium("gold")}
        >
          Choose Gold
        </button>
      </div>
    </div>
  );
};

export default Premium;
