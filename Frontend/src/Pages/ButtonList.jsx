import { useNavigate } from "react-router-dom";

const BUTTONS_LIST = [{btnName: "Available Sheets",_id: "1", moveTo:"/availableSheet"},
                      {btnName: "Contest",_id: "2", moveTo:"/contest"}];

const gradients = [
  "bg-gradient-to-br from-rose-400 via-pink-400 to-orange-400",
  "bg-gradient-to-br from-cyan-400 via-sky-400 to-indigo-400",
  "bg-gradient-to-br from-lime-400 via-green-400 to-emerald-400",
  "bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400",
  "bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400",
];

const shadows = [
  "rose-200/40",
  "sky-200/40",
  "green-200/40",
  "fuchsia-200/40",
  "orange-200/40",
];

function getGradientColor(i) {
  return gradients[i % gradients.length];
}

function getShadowColor(i) {
  return shadows[i % shadows.length];
}


export default function HomeButtons(){
    const navigate = useNavigate();
    return (
    <div className="min-h-screen flex flex-wrap justify-center items-center gap-8 p-10 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
  {BUTTONS_LIST.map((button, index) => (
    <button
      key={button.btnName}
      onClick={() => navigate(button.moveTo)}
      className={`
        w-48 h-48
        flex flex-col items-center justify-center gap-3
        rounded-2xl
        text-white font-semibold text-lg tracking-wide
        shadow-lg shadow-${getShadowColor(index)}
        border border-white/20
        transform transition-all duration-300
        hover:scale-105 hover:rotate-1 hover:shadow-xl
        focus:outline-none
        ${getGradientColor(index)}
      `}
    >
      <span className="text-3xl opacity-90">{button.icon}</span>
      <span>{button.btnName}</span>
    </button>
  ))}
</div>
)
}