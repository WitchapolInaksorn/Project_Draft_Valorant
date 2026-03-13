const SummaryModal = ({ history, onRestart, setupData }) => {
  const finalMaps = history.filter(
    (h) => h.action === "Picked" || h.action === "Decider",
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 overflow-y-auto">
      <div className="max-w-5xl w-full bg-[#0f1923] border border-white/10 p-6 md:p-10 shadow-2xl relative my-auto">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none font-black text-7xl md:text-[10rem] italic uppercase whitespace-nowrap">
          Summary
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black italic text-center mb-8 tracking-tighter text-white">
            Final <span className="text-red-500">Map Pool</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {finalMaps.map((item, idx) => {
              const sideData = item.sideSelection;
              const pickingSideTeam = sideData?.team;

              let attackTeam, defendTeam;

              if (sideData?.side === "ATTACK") {
                attackTeam =
                  pickingSideTeam === "Team 1"
                    ? setupData?.team1
                    : setupData?.team2;
                defendTeam =
                  pickingSideTeam === "Team 1"
                    ? setupData?.team2
                    : setupData?.team1;
              } else {
                defendTeam =
                  pickingSideTeam === "Team 1"
                    ? setupData?.team1
                    : setupData?.team2;
                attackTeam =
                  pickingSideTeam === "Team 1"
                    ? setupData?.team2
                    : setupData?.team1;
              }

              return (
                <div
                  key={idx}
                  className="relative group border border-white/5 bg-white/5 hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={item.map.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={item.map.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923] via-transparent to-transparent" />

                    <div
                      className={`absolute top-0 left-0 px-3 py-1 text-[10px] font-black italic ${
                        item.action === "Decider"
                          ? "bg-yellow-500/50 text-black"
                          : "bg-white/50 text-black"
                      }`}
                    >
                      Map {idx + 1} {item.action === "Decider" && "- Decider"}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <p className="text-[11px] font-bold text-white/40 tracking-widest mb-1">
                        {item.action === "Decider"
                          ? "Picked by random"
                          : `Picked by ${item.team === "Team 1" ? setupData?.team1 : setupData?.team2}`}
                      </p>
                      <h3 className="text-2xl font-black italic text-white leading-none">
                        {item.map.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                      <div className="flex flex-col items-center py-1.5 bg-red-500/5 border border-red-500/10">
                        <span className="text-[12px] text-red-500 font-bold tracking-tighter">
                          Attack
                        </span>
                        <span className="text-[12px] font-bold text-white truncate px-1 w-full text-center">
                          {attackTeam || "TBD"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center py-1.5 bg-blue-500/5 border border-blue-500/10">
                        <span className="text-[12px] text-blue-500 font-bold tracking-tighter">
                          Defend
                        </span>
                        <span className="text-[12px] font-bold text-white truncate px-1 w-full text-center">
                          {defendTeam || "TBD"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              onClick={onRestart}
              className="group relative px-12 py-4 bg-red-700 overflow-hidden transition-all active:scale-95"
            >
              <span className="relative z-10 text-white font-black tracking-[0.1em] text-base">
                Finish & Reset Session
              </span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
