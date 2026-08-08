"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [instituteCode, setInstituteCode] = useState("");

  const handleContinue = () => {
    if (!instituteCode.trim()) {
      alert("Please enter your institute code.");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("username", name.trim());
    localStorage.setItem("instituteCode", instituteCode.trim());

    router.push("/subscription");
  };

  return (
    <main className="min-h-screen bg-[#f8f3eb] flex items-center justify-center p-8">
      <div className="w-full max-w-[1115px] min-h-[632px] grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-[14px] border border-[#d8cbb8] bg-white shadow-[0_18px_38px_rgba(47,38,31,0.12)]">

        {/* LEFT BRAND PANEL */}
        <section className="bg-[#7a233b] text-white px-14 py-14 flex flex-col justify-between">

          <div>
            {/* Logo */}
            <div className="w-[68px] h-[68px] rounded-[9px] bg-white flex items-center justify-center overflow-hidden mb-12">
              <img
                src="/assets/logo.png"
                alt="Paper Tree"
                className="w-full h-full object-contain p-2"
              />
            </div>

            {/* Heading */}
            <h1
              className="text-[42px] leading-tight font-semibold"
              style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
            >
              Test Generator
            </h1>

            {/* Description */}
            <p
              className="mt-5 max-w-[470px] text-[19px] leading-[1.55] text-white"
              style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
            >
              Build board-pattern papers from your institute&apos;s question
              bank. Select questions, set the marks spread, print the paper
              and the answer key.
            </p>
          </div>

          {/* Footer */}
          <p
            className="text-[14px] text-white/90"
            style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
          >
            Paper Tree Educational Studio
          </p>
        </section>

        {/* RIGHT SIGN-IN PANEL */}
        <section className="bg-[#fffdf9] px-14 py-14 flex items-center">
          <div className="w-full max-w-[430px] mx-auto">

            <h2
              className="text-[42px] leading-tight font-semibold text-[#2f261f]"
              style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
            >
              Sign in
            </h2>

            <p
              className="mt-2 text-[14px] text-[#6f6257]"
              style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
            >
              Use your institute details to access Test Generator.
            </p>

            {/* Institute code */}
            <div className="mt-10">
              <label
                htmlFor="instituteCode"
                className="block text-[14px] font-semibold text-[#2f261f] mb-2"
              >
                Institute code
              </label>

              <input
                id="instituteCode"
                type="text"
                value={instituteCode}
                onChange={(e) => setInstituteCode(e.target.value)}
                placeholder="Enter institute code"
                className="w-full h-[48px] rounded-[8px] border border-[#d8cbb8] bg-white px-4 text-[14px] text-[#2f261f] outline-none transition focus:border-[#7a233b] focus:ring-2 focus:ring-[#7a233b]/10"
              />
            </div>

            {/* Name */}
            <div className="mt-6">
              <label
                htmlFor="name"
                className="block text-[14px] font-semibold text-[#2f261f] mb-2"
              >
                Your name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleContinue();
                  }
                }}
                className="w-full h-[48px] rounded-[8px] border border-[#d8cbb8] bg-white px-4 text-[14px] text-[#2f261f] outline-none transition focus:border-[#7a233b] focus:ring-2 focus:ring-[#7a233b]/10"
              />
            </div>

            {/* Continue */}
            <button
              onClick={handleContinue}
              className="w-full h-[48px] mt-6 rounded-[8px] bg-[#7a233b] text-white text-[14px] font-semibold transition hover:bg-[#5d182d] active:bg-[#5d182d]"
            >
              Continue
            </button>

            <p
              className="mt-7 text-[12px] leading-5 text-[#6f6257]"
              style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
            >
              By continuing, you will be taken to your subscribed courses.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}