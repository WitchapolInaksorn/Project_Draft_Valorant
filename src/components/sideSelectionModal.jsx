import attack from "../assets/side/atk.png";
import defend from "../assets/side/def.png";

const SideSelectionModal = ({
  pickingTeam,
  onSelect,
  setupData,
  pendingAction,
}) => {
  const actualPicker =
    pendingAction?.sidePicker ||
    (pickingTeam === "Team 1" ? "Team 2" : "Team 1");

  const isTeam1Selecting = actualPicker === "Team 1";
  const selectingTeamName = isTeam1Selecting
    ? setupData.team1
    : setupData.team2;
  const teamColorClass = isTeam1Selecting ? "text-red-500" : "text-blue-500";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
      <div className="text-center w-full max-w-md md:max-w-none">
        <p className="text-white/50 text-xl md:text-3xl font-bold tracking-[0.2em] mb-2 italic">
          SIDE SELECTION
        </p>
        <h2 className="text-3xl md:text-6xl font-black mb-8 md:mb-12 tracking-tighter text-white">
          Waiting for{" "}
          <span className={teamColorClass}>{selectingTeamName}</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-10 justify-center items-center">
          <button
            onClick={() => onSelect("ATTACK")}
            className="group relative w-full md:w-64 h-32 md:h-80 bg-white/5 border border-white/10 hover:border-red-500 transition-all overflow-hidden"
          >
            <div className="flex flex-row md:flex-col items-center justify-center h-full gap-4 md:gap-6">
              <img
                src={attack}
                className="w-12 md:w-24 opacity-100 md:opacity-40 group-hover:opacity-100 transition-all"
                alt="attack"
              />
              <span className="text-2xl md:text-3xl font-black italic uppercase">
                Attack
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelect("DEFEND")}
            className="group relative w-full md:w-64 h-32 md:h-80 bg-white/5 border border-white/10 hover:border-blue-500 transition-all overflow-hidden"
          >
            <div className="flex flex-row md:flex-col items-center justify-center h-full gap-4 md:gap-6">
              <img
                src={defend}
                className="w-12 md:w-24 opacity-100 md:opacity-40 group-hover:opacity-100 transition-all"
                alt="defend"
              />
              <span className="text-2xl md:text-3xl font-black italic uppercase">
                Defend
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideSelectionModal;
