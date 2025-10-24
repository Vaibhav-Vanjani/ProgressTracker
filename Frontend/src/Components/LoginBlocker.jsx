export default function LoginBlocker() {
  return (
    <section className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 p-4">
      <div className="relative flex flex-col w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors">
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center p-8 gap-3 bg-white/10">
          <img
            src="/your-logo.svg"
            alt="Logo"
            className="w-16 h-16 mb-2"
          />
          <h1 className="text-2xl font-bold">Welcome to Progress Tracker!</h1>
          <p className="text-white/80 text-sm">
            Track your progress, save favorites, and master problems with our comprehensive practice platform.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-3 p-6">
          {[
            "Track your progress across different problem types",
            "Save and organize your favorite problems",
            "Access curated problem sheets and practice modes",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-green-400 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Login Button */}
        <div className="p-6 pt-0">
          <button className="flex w-full justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>
            <span>Login</span>
          </button>
        </div>
      </div>
    </section>
  );
}
