import { useState } from "react";
import { WifiOff, RefreshCw, AlertCircle, Signal } from "lucide-react";

const Offline = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [retryMessage, setRetryMessage] = useState("");

  const handleRetry = () => {
    setIsChecking(true);
    setRetryMessage("");

    setTimeout(() => {
      setIsChecking(false);
      if (navigator.onLine) {
        window.location.reload();
      } else {
        setRetryMessage("Still offline. Please check your internet connection.");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-white flex flex-col justify-between items-center p-6 text-gray-800">
      {/* Top Brand Header */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Ruchy"
            className="h-10 w-auto object-contain drop-shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-red-200">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>Offline Mode</span>
        </div>
      </header>

      {/* Main Offline Card */}
      <main className="w-full max-w-lg my-auto flex flex-col items-center text-center px-4 py-8">
        {/* Animated Icon Container */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-orange-100/80 flex items-center justify-center shadow-inner relative">
            <div className="absolute inset-0 rounded-full border-2 border-orange-300 animate-ping opacity-25"></div>
            <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
              <WifiOff className="w-10 h-10" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md border border-gray-100 text-red-500">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Heading & Description */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Connection Lost
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-md leading-relaxed mb-8">
          You appear to be offline. Ruchy needs an active internet connection to
          explore restaurants, view live menus, and place orders.
        </p>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <button
            onClick={handleRetry}
            disabled={isChecking}
            className="w-full flex items-center justify-center gap-2.5 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] disabled:opacity-70 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-600/25 transition-all duration-200 cursor-pointer"
          >
            <RefreshCw
              className={`w-5 h-5 ${isChecking ? "animate-spin" : ""}`}
            />
            <span>{isChecking ? "Checking Connection..." : "Try Again"}</span>
          </button>

          {retryMessage && (
            <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg animate-fade-in">
              {retryMessage}
            </p>
          )}
        </div>

        {/* Quick Tips */}
        <div className="mt-10 w-full bg-white/80 backdrop-blur-sm border border-orange-100 rounded-2xl p-5 shadow-sm text-left">
          <div className="flex items-center gap-2 mb-3 text-orange-950 font-semibold text-sm">
            <Signal className="w-4 h-4 text-orange-600" />
            <span>Troubleshooting Tips:</span>
          </div>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span>Check your Wi-Fi or mobile data toggle.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span>Ensure Airplane Mode is turned off.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span>
                Once connected, Ruchy will automatically restore your page.
              </span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Ruchy Food Delivery. All rights reserved.
      </footer>
    </div>
  );
};

export default Offline;
