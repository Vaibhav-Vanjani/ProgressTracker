import { useNavigate } from "react-router-dom";

export default function SheetCollection({ sheet, sheetViewHandler }) {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-gray-50 py-10 px-6">
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
