"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("username", name);

  router.push("/subscription")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl">

        <div className="text-center">

          <div className="text-6xl mb-4">📄</div>

          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to
          </h1>

          <h2 className="text-5xl font-extrabold text-blue-600 mt-2">
            Paper Test Generator
          </h2>

          <p className="text-gray-500 mt-5">
            Create beautiful question papers in just a few clicks.
          </p>

        </div>

        <div className="mt-10">

          <label className="font-semibold text-gray-700">
            Your Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-3 border border-gray-300 rounded-xl p-4 outline-none focus:ring-4 focus:ring-blue-300"
          />

          <button
            onClick={handleContinue}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-4 rounded-xl text-lg"
          >
            Continue to Dashboard →
          </button>

        </div>

      </div>

    </div>
  );
}