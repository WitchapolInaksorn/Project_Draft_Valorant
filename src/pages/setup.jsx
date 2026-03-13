import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Setup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("draftActive");
    window.history.replaceState(null, "");
  }, []);

  const [setupData, setSetupData] = useState({
    team1: "",
    team2: "",
    mode: null,
  });

  const handleExecute = () => {
    sessionStorage.setItem("draftActive", "true");
    navigate("/draft", { state: { setupData } });
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
        <div className="bg-[#0f1923]/90 rounded-[15px] p-8 border border-white/5">
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <div className="w-10 md:w-12 h-0.5 bg-red-600 mb-4 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase leading-none text-center">
              Valorant <span className="text-red-600">Draft</span>
            </h1>
            <p className="text-gray-400 tracking-widest text-[9px] sm:text-[11px] font-medium mt-2 opacity-80 text-center">
              Simulate Competitive Map Veto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-gray-400 ml-1">
                Team Initiator
              </label>
              <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-red-600/50 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={setupData.team1}
                  onChange={(e) =>
                    setSetupData({ ...setupData, team1: e.target.value })
                  }
                  className="relative w-full bg-[#161f27] border border-white/10 px-4 py-2.5 rounded-lg text-white font-medium focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-600 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-gray-400 ml-1">
                Team Opponent
              </label>
              <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-blue-600/50 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={setupData.team2}
                  onChange={(e) =>
                    setSetupData({ ...setupData, team2: e.target.value })
                  }
                  className="relative w-full bg-[#161f27] border border-white/10 px-4 py-2.5 rounded-lg text-white font-medium focus:outline-none focus:border-blue-600/50 transition-all placeholder:text-gray-600 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[11px] font-semibold text-gray-400 mb-3 ml-1">
              Series Format
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["BO3", "BO5"].map((m) => (
                <button
                  key={m}
                  onClick={() => setSetupData({ ...setupData, mode: m })}
                  className={`relative py-3 rounded-lg border-2 transition-all duration-300 ${
                    setupData.mode === m
                      ? "border-red-600/60 bg-red-600/10 shadow-lg"
                      : "border-white/5 bg-white/5 hover:border-white/10"
                  }`}
                >
                  <span
                    className={`text-sm font-bold italic ${setupData.mode === m ? "text-white" : "text-gray-500"}`}
                  >
                    {m === "BO3" ? "Best of 3" : "Best of 5"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              disabled={!setupData.team1 || !setupData.team2 || !setupData.mode}
              onClick={handleExecute}
              className="relative w-48 overflow-hidden rounded-lg group transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-[#8a2be2] to-red-600 transition-opacity duration-300 group-hover:from-blue-600 group-hover:to-red-500"></div>
              <div className="relative py-3 flex items-center justify-center gap-2">
                <span className="text-base font-black tracking-wider text-white italic">
                  Execute
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
