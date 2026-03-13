import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { valorantMaps, banStepBO3, banStepBO5 } from "../data/maps";
import SummaryModal from "../components/summaryModal";
import SideSelectionModal from "../components/sideSelectionModal";

const Draft = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const setupData = state?.setupData;

  useEffect(() => {
    const draftActive = sessionStorage.getItem("draftActive");

    if (!setupData || !draftActive) {
      navigate("/", { replace: true });
    }
  }, [setupData, navigate]);

  if (!setupData) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [deciderMap, setDeciderMap] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [tempRandomMap, setTempRandomMap] = useState(null);
  const [showSideModal, setShowSideModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const currentRules = setupData.mode === "BO5" ? banStepBO5 : banStepBO3;

  const getTeamName = (stepTeam) => {
    if (stepTeam === "Team 1") return setupData.team1 || "TEAM 1";
    if (stepTeam === "Team 2") return setupData.team2 || "TEAM 2";
    return stepTeam;
  };

  const currentStep = currentRules ? currentRules[currentStepIndex] : null;

  const processDecider = (updatedHistory) => {
    const usedMapIds = updatedHistory.map((h) => h.map.id);
    const availableMaps = valorantMaps.filter(
      (m) => !usedMapIds.includes(m.id),
    );

    if (availableMaps.length > 0) {
      let shuffleCount = 0;
      const maxShuffle = 15;

      const shuffleInterval = setInterval(() => {
        const randomDisplay =
          availableMaps[Math.floor(Math.random() * availableMaps.length)];
        setTempRandomMap(randomDisplay);
        shuffleCount++;

        if (shuffleCount >= maxShuffle) {
          clearInterval(shuffleInterval);
          const finalMap =
            availableMaps[Math.floor(Math.random() * availableMaps.length)];

          const lastSideAction = [...updatedHistory]
            .reverse()
            .find((h) => h.sideSelection);

          let deciderSidePicker;
          if (lastSideAction) {
            deciderSidePicker =
              lastSideAction.sideSelection.team === "Team 1"
                ? "Team 2"
                : "Team 1";
          } else {
            deciderSidePicker = "Team 2";
          }

          const deciderAction = {
            ...currentRules[currentRules.length - 1],
            map: finalMap,
            team: "System",
            sidePicker: deciderSidePicker,
            action: "Decider",
          };

          setDeciderMap(finalMap);
          setTempRandomMap(null);
          setPendingAction(deciderAction);
          setShowSideModal(true);
        }
      }, 150);
    }
  };

  const handleMapClick = (map) => {
    if (
      history.find((h) => h.map.id === map.id) ||
      currentStepIndex >= currentRules.length - 1
    )
      return;

    const newAction = { ...currentStep, map };

    if (currentStep.action === "Picked") {
      setPendingAction(newAction);
      setShowSideModal(true);
    } else {
      executeStep(newAction);
    }
  };

  const executeStep = (actionWithSide = null) => {
    const finalAction = actionWithSide || pendingAction;
    const updatedHistory = [...history, finalAction];

    setHistory(updatedHistory);
    setPendingAction(null);
    setShowSideModal(false);

    const nextIndex = currentStepIndex + 1;

    if (nextIndex < currentRules.length) {
      setCurrentStepIndex(nextIndex);

      if (currentRules[nextIndex] && currentRules[nextIndex].team === "") {
        processDecider(updatedHistory);
      }
    } else {
      setCurrentStepIndex(currentRules.length);
      setTimeout(() => setShowSummary(true), 1000);
    }
  };

  const handleSideSelect = (side) => {
    const sidePicker =
      pendingAction.action === "Decider"
        ? pendingAction.sidePicker
        : pendingAction.team === "Team 1"
          ? "Team 2"
          : "Team 1";

    const actionWithSide = {
      ...pendingAction,
      sideSelection: {
        team: sidePicker,
        side: side,
      },
    };

    executeStep(actionWithSide);
  };

  return (
    <div className="min-h-screen bg-[#0f1923] text-white flex flex-col overflow-hidden font-sans select-none relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-12 py-6 sm:py-8 gap-6 lg:gap-0 bg-gradient-to-b from-black/80 to-transparent">
        {" "}
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-red-500 flex items-center justify-center rounded-sm rotate-45 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <div className="rotate-[-45deg] text-white font-black text-sm sm:text-lg lg:text-xl sm:text-2xl lg:text-3xl italic">
              1
            </div>
          </div>
          <div>
            <p className="text-[13px] text-red-500 font-bold tracking-widest">
              Initiator Team
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black italic tracking-tighter">
              {setupData.team1}
            </h2>
          </div>
        </div>
        <div
          className={`text-center border-t-2 pt-3 px-6 sm:px-10 lg:px-12 bg-white/5 backdrop-blur-md rounded-b-xl transition-all duration-500 ${
            tempRandomMap || !currentStep
              ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              : currentStep?.team === "Team 2"
                ? "border-blue-500"
                : "border-red-500"
          }`}
        >
          <p className="text-gray-400 text-[14px] tracking-[0.2em] mb-1">
            Phase: {currentStep?.action || "Final"}
          </p>
          <h3
            className={`text-sm sm:text-lg lg:text-xl font-black animate-pulse pb-2 transition-colors duration-500 ${
              tempRandomMap || !currentStep
                ? "text-yellow-400"
                : currentStep?.team === "Team 2"
                  ? "text-blue-500"
                  : "text-red-500"
            }`}
          >
            {currentStep
              ? getTeamName(currentStep.team) || "Randomizing"
              : "Veto Finished"}
          </h3>
        </div>
        <div className="flex items-center gap-6 text-right">
          <div>
            <p className="text-[13px] text-blue-500 font-bold tracking-widest">
              Opponent Team
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black italic tracking-tighter">
              {setupData.team2}
            </h2>
          </div>
          <div className="w-14 h-14 bg-blue-500 flex items-center justify-center rounded-sm rotate-45 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <div className="rotate-[-45deg] text-white font-black text-sm sm:text-lg lg:text-xl italic">
              2
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 px-4 sm:px-6 lg:px-12 gap-6 lg:gap-10 mt-4">
        {" "}
        <div className="w-full lg:w-1/4 flex flex-col gap-3 overflow-y-auto max-h-[40vh] lg:max-h-[75vh] pr-2 custom-scrollbar">
          {currentRules.map((step, idx) => {
            const h = history[idx];
            const isActive = idx === currentStepIndex;
            const isTeam2 = step.team === "Team 2";
            return (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-r-lg border-l-4 transition-all duration-500 ${
                  isActive
                    ? isTeam2
                      ? "border-blue-600 bg-white/10 translate-x-2"
                      : "border-red-600 bg-white/10 translate-x-2"
                    : "border-white/10 opacity-30 bg-black/40"
                }`}
              >
                <span
                  className={`text-2xl font-black italic transition-colors duration-500 ${
                    isActive
                      ? isTeam2
                        ? "text-blue-500"
                        : "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-[15px] text-gray-400 font-bold tracking-widest">
                    {getTeamName(step.team) || "System"}
                  </p>
                  <p className="font-black italic text-lg leading-none tracking-tighter">
                    {step.action} {h ? `- ${h.map.name}` : ""}
                  </p>
                </div>
                {h && (
                  <img
                    src={h.map.image}
                    className="w-20 h-10 object-cover border border-white/20 rounded shadow-lg"
                    alt="map-thumb"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-3 pt-3 pb-12 overflow-y-auto max-h-[75vh] pr-2">
          {valorantMaps.map((map) => {
            const h = history.find((item) => item.map.id === map.id);
            const isBanned = h?.action === "Banned";
            const isPicked = h?.action === "Picked";
            const isDecider = deciderMap?.id === map.id;

            const isDeciderActive =
              deciderMap?.id === map.id || tempRandomMap?.id === map.id;

            return (
              <div
                key={map.id}
                onClick={() => handleMapClick(map)}
                className={`relative group cursor-pointer overflow-hidden rounded-md transition-all duration-300
                ${isBanned ? "grayscale brightness-50 scale-[0.97]" : "hover:scale-[1.02] active:scale-95"}
                ${isPicked ? "ring-2 ring-green-500 ring-offset-2 ring-offset-[#0f1923]" : ""}
                ${isDecider ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-[#0f1923]" : ""}
                `}
              >
                <div className="h-32 sm:h-40 md:h-48 relative overflow-hidden">
                  <img
                    src={map.image}
                    alt={map.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>

                  {isBanned && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-bold opacity-80">
                        ✕
                      </div>
                      <div className="text-sm tracking-[0.3em] mt-1">
                        Banned
                      </div>
                    </div>
                  )}

                  {isPicked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-green-500 z-10">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-black italic drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                        ✓
                      </div>
                      <div className="text-sm tracking-[0.3em] mt-1 font-bold">
                        Picked
                      </div>
                    </div>
                  )}

                  {isDeciderActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-yellow-400 z-10 animate-pulse bg-yellow-400/10">
                      <div className="text-4xl font-black italic drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] uppercase">
                        {tempRandomMap ? "Random" : "Final"}
                      </div>
                      <div className="text-sm tracking-[0.3em] mt-1 font-bold bg-black/60 px-2 py-0.5 rounded">
                        Devider
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 py-3 text-center z-20">
                  <span className="font-extrabold text-sm sm:text-lg lg:text-xl tracking-widest text-gray-300">
                    {map.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          sessionStorage.removeItem("draftActive");
          navigate("/", { replace: true });
        }}
        className="
relative 
lg:fixed 
mt-2
mb-5 
lg:mt-0 
lg:bottom-10 
lg:left-12 
z-[60] 
group 
flex 
items-center 
gap-3 
transition-all 
duration-300 
active:scale-95
"
      >
        <div className="relative w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-red-500/50 transition-colors">
          <div className="absolute inset-0 bg-white/5 group-hover:bg-red-500/10 transition-colors"></div>
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M15 18l-6-6 6-6" strokeLinecap="square" />
          </svg>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-[13px] text-gray-500 tracking-[0.2em] font-bold group-hover:text-red-400 transition-colors">
            Return to
          </span>
          <span className="text-[19px] font-black italic tracking-tighter text-white group-hover:text-red-500 transition-all flex items-center gap-2">
            Setup Phase
            <div className="h-[2px] w-0 group-hover:w-8 bg-red-500 transition-all duration-300"></div>
          </span>
        </div>
      </button>

      {showSideModal && (
        <SideSelectionModal
          pendingAction={pendingAction}
          pickingTeam={pendingAction?.team}
          onSelect={handleSideSelect}
          setupData={setupData}
        />
      )}

      {showSummary && (
        <SummaryModal
          history={history}
          setupData={setupData}
          onRestart={() => {
            sessionStorage.removeItem("draftActive");
            navigate("/", { replace: true });
          }}
        />
      )}
    </div>
  );
};

export default Draft;
