import Button from "components/button/buttons";
import React from "react";

const plans = [
  {
    title: "Free",
    amount: "0",
    multipleChoice: "10",
    flashcard: "10",
    topic: "10",
    ai: false,
  },
  {
    title: "Standard",
    amount: "2000",
    multipleChoice: "10",
    flashcard: "10",
    topic: "10",
    ai: true,
  },
  {
    title: "Premium",
    amount: "5000",
    multipleChoice: "10",
    flashcard: "10",
    topic: "10",
    ai: true,
  },
];

export default function Pricing() {
  return (
    <div className="py-20">
      <div className="text-center mb-20">
        <h3 className="text-3xl font-bold mb-2">Quiryfy Pricing Plans</h3>
        <p className="text-lg">
          Start generating questions to strengthen your knowledge
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 grid lg:grid-cols-3 gap-4">
        {plans?.length > 0 &&
          plans.map((plan, index) => (
            <div
              key={index}
              className="border py-8 px-4 lg:px-6 rounded-lg shadow-sm"
            >
              <div className="mb-6 mt-4">
                <p className="text-lg font-medium">{plan?.title}</p>
                <p className="">
                  <span className="text-3xl text-primary font-bold">
                    ₦{plan?.amount}
                  </span>
                  /month
                </p>
              </div>
              <div className="pb-8 pt-4 border-b">
                <p className="mb-2 font-medium">Study with:</p>
                <p className="mb-2">
                  <span>{plan?.multipleChoice}</span> Multiple choice questions
                </p>
                <p className="mb-2">
                  <span>{plan?.flashcard}</span> Flashcards
                </p>
                <p className="mb-2">
                  <span>{plan?.topic}</span> Topic selection
                </p>
                <p className="mb-2">
                  <span>{plan?.ai}</span> AI Discussions
                </p>
              </div>
              <div className="pb-8 pt-4">
                <p className="mb-2 font-medium">Plan limits:</p>
                <p className="mb-2">2 practice tests per month</p>
                <p className="mb-2">5 questions per test</p>
                <p className="mb-2">Max file size 15mb</p>
              </div>

              <Button.Primary
                title={`Subscribe to ${plan?.title}`}
                className="w-full py-2"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

// function handleSubscribe(email, amount, userId) {
//   var handler = PaystackPop.setup({
//     key: "YOUR_PUBLIC_KEY",
//     email: email,
//     amount: amount * 100,
//     ref: String(Date.now()),
//     metadata: {
//       custom_fields: [
//         { display_name: "User ID", variable_name: "user_id", value: userId },
//       ],
//     },
//     callback: function (response) {
//       // Send reference and userId to your backend
//       fetch("/api/verify-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           reference: response.reference,
//           userId: userId,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           alert(data.message);
//           // You can now show subscription is active in UI
//         })
//         .catch(() => alert("Failed to verify payment"));
//     },
//     onClose: function () {
//       alert("Payment window closed");
//     },
//   });

//   handler.openIframe();
// }
