import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUrl = localStorage.getItem("redirectUrl");
    if (savedUrl) {
      setRedirectUrl(savedUrl);
      setTempUrl(savedUrl);
    }
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem("redirectUrl", tempUrl);
    setRedirectUrl(tempUrl);
    setShowSettings(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    
    // Simulate login delay then redirect
    setTimeout(() => {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        alert("Please set a redirect URL in settings first!");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden relative">
      {/* Bluetrees text sliding from bottom */}
      <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="text-[12vw] font-light tracking-[0.3em] uppercase"
          style={{ color: "hsl(210, 100%, 50%)" }}
        >
          Bluetrees
        </span>
      </motion.div>

      {/* Overlay text sliding from top */}
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="text-[14vw] font-black tracking-wider uppercase"
          style={{ color: "hsl(210, 100%, 35%)" }}
        >
          Overlay
        </span>
      </motion.div>

      {/* Glass Settings Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        onClick={() => {
          setTempUrl(redirectUrl);
          setShowSettings(true);
        }}
        className="absolute top-6 right-6 p-3 rounded-full backdrop-blur-md bg-white/30 border border-white/50 shadow-lg hover:bg-white/50 transition-all duration-300 z-50"
        style={{ boxShadow: "0 8px 32px rgba(0, 100, 255, 0.2)" }}
      >
        <Settings className="w-6 h-6" style={{ color: "hsl(210, 100%, 40%)" }} />
      </motion.button>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-40 w-full max-w-md mx-4"
      >
        <div
          className="backdrop-blur-xl bg-white/70 rounded-2xl p-8 shadow-2xl border border-white/60"
          style={{ boxShadow: "0 25px 50px -12px rgba(0, 100, 255, 0.25)" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="text-2xl font-bold text-center mb-8"
            style={{ color: "hsl(210, 100%, 30%)" }}
          >
            Welcome Back
          </motion.h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "hsl(210, 100%, 35%)" }}
              >
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-white/80 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "hsl(210, 100%, 35%)" }}
              >
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white/80 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <Button
                type="submit"
                disabled={isLoading || !username || !password}
                className="w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 100%, 50%), hsl(210, 100%, 35%))",
                }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </motion.div>
          </form>

          {redirectUrl && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-center text-sm mt-4 text-blue-400"
            >
              Redirecting to: {redirectUrl}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-20 right-6 z-50 w-80"
            >
              <div
                className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-2xl border border-white/60"
                style={{ boxShadow: "0 25px 50px -12px rgba(0, 100, 255, 0.3)" }}
              >
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: "hsl(210, 100%, 30%)" }}
                >
                  Settings
                </h3>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "hsl(210, 100%, 35%)" }}
                >
                  Redirect URL
                </label>
                <Input
                  type="url"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full mb-4 bg-white/80 border-blue-200"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowSettings(false)}
                    variant="outline"
                    className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveSettings}
                    className="flex-1 text-white"
                    style={{
                      background: "linear-gradient(135deg, hsl(210, 100%, 50%), hsl(210, 100%, 35%))",
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
