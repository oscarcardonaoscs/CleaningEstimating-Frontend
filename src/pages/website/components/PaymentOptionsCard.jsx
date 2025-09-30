import React, { useState } from "react";
import venmoIcon from "../assets/venmo-icon.svg";
import cashappIcon from "../assets/cashapp-icon.svg";

/**
 * MCJ's Cleaning Service – Payment Options Card (JSX version)
 * - Pure JSX (no TypeScript types) to satisfy ESLint in .jsx files
 * - Includes copy-to-clipboard and buttons for Venmo / Cash App
 */
export default function PaymentOptionsCard() {
  const [copied, setCopied] = useState(null);

  const venmoUser = "Oscar-CardonaSalas"; // display with @
  const cashTag = "mcjscleaningservice"; // display with $
  const checkPayee = "MCJ's Cleaning Service";

  function copy(text, label) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(label);
        setTimeout(() => setCopied(null), 1800);
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
            Payment Options
          </h1>
          <p className="text-slate-500 mt-2">MCJ’s Cleaning Service</p>
        </header>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Check */}
          <section className="rounded-2xl bg-white shadow-md p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="text-2xl">
                📝
              </span>
              <h2 className="text-xl font-medium text-slate-800">Check</h2>
            </div>
            <p className="text-slate-600 mb-4">Make checks payable to:</p>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-slate-800 select-all font-semibold">
              {checkPayee}
            </div>
          </section>

          {/* Venmo */}
          <section className="rounded-2xl bg-white shadow-md p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <img src={venmoIcon} alt="Venmo" className="w-7 h-7" />
              <h2 className="text-xl font-medium text-slate-800">Venmo</h2>
            </div>
            <p className="text-slate-600 mb-4">Username:</p>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 text-slate-800 select-all">
              @{venmoUser}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <a
                href={`https://venmo.com/u/${venmoUser}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Open Venmo
              </a>
              <button
                onClick={() => copy(`@${venmoUser}`, "venmo")}
                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium bg-slate-800 text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Copy @Username
              </button>
            </div>
          </section>

          {/* Cash App */}
          <section className="rounded-2xl bg-white shadow-md p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <img src={cashappIcon} alt="CashApp" className="w-7 h-7" />
              <h2 className="text-xl font-medium text-slate-800">Cash App</h2>
            </div>
            <p className="text-slate-600 mb-4">Cashtag:</p>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200 text-slate-800 select-all">
              ${cashTag}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <a
                href={`https://cash.app/$${cashTag}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                Open Cash App
              </a>
              <button
                onClick={() => copy(`$${cashTag}`, "cashapp")}
                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium bg-slate-800 text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Copy $Cashtag
              </button>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Thank you for choosing MCJ’s Cleaning Service ✨
        </p>

        {/* Toast */}
        {copied && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg">
            {copied === "check" && "Payee name copied"}
            {copied === "venmo" && "Venmo username copied"}
            {copied === "cashapp" && "Cash App cashtag copied"}
          </div>
        )}
      </div>
    </div>
  );
}
