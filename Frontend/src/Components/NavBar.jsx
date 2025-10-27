import { useTrackerContext } from "../Context/ProgressTrackerContext.jsx";

export default function Navbar() {
  const { setShowLoginForm, setShowSignupForm , userData } = useTrackerContext();
  console.log(userData,"Navbar");

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-3">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="bg-white text-blue-600 font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md">
            PT
          </div>
          <h1 className="text-white font-semibold text-lg tracking-wide">
            ProgressTracker
          </h1>
        </div>

        {/* Nav Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowLoginForm(false);
              setShowSignupForm(true);
            }}
            className="px-4 py-2 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition duration-200 shadow"
          >
            Sign Up
          </button>

          <button
            onClick={() => {
              setShowSignupForm(false);
              setShowLoginForm(true);
            }}
            className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200 shadow"
          >
            Log In
          </button>
        </div>
      </nav>
    </header>
  );
}
