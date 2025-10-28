import { useNavigate } from "react-router-dom";

export default function SheetCollection({ sheet, sheetViewHandler }) {
  const navigate = useNavigate();
  return (
    <section className="w-full h-screen bg-gray-50 py-10 px-6">
       <div className="w-full flex justify-start">
        <button
          onClick={()=>navigate(-1)}
          className="mt-14 mb-5 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg shadow-sm transition-all duration-200 hover:translate-x-[-2px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>Back</span>
        </button>
      </div>
      <h1 className="mt-7 text-2xl font-bold text-center text-gray-800 mb-8">
        📘 Available Sheets
      </h1>

      {sheet?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sheet.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item._id)}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50"
            >
              <div className="flex flex-col items-center gap-3">
                {/* Optional Icon / Emoji */}
                <div className="bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">
                  📄
                </div>

                {/* Sheet Name */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {item?.sheetName || "Untitled Sheet"}
                </h2>

                {/* Optional Details */}
                {item?.sheetDescription && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.sheetDescription}
                  </p>
                )}

                {/* Action Button Style */}
                <button className="cursor-pointer mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition">
                  View Sheet
                </button>
              </div>
            </div>
          ))}
        <div className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50"
            >
              <div className="flex flex-col items-center gap-3">
                {/* Optional Icon / Emoji */}
                <div className="bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">
                  +
                </div>

                {/* Sheet Name */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {"Add New Sheet"}
                </h2>

                {/* Action Button Style */}
                <button
                onClick={() => navigate("create-sheet")}
                className="cursor-pointer mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition">
                  Add Sheet
                </button>
              </div>
            </div>
        </div>
      ) : (
        <>
          <div className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50"
            >
              <div className="flex flex-col items-center gap-3">
                {/* Optional Icon / Emoji */}
                <div className="bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">
                  +
                </div>

                {/* Sheet Name */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {"Add New Sheet"}
                </h2>

                {/* Action Button Style */}
                <button
                onClick={() => navigate("create-sheet")}
                className="cursor-pointer mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition">
                  Add Sheet
                </button>
              </div>
            </div>
        </>
      )}
    </section>
  );
}
