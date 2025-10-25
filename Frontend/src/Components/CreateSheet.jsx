import { useState } from "react";
import RecursiveSection from "./RecursiveSection";

export default function CreateSheet() {
    const [sheetName,setSheetName] = useState("");
    const [showSectionBar,setShowSectionBar] = useState(false);
    
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-[600px]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create a New Sheet
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Sheet Name"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>setSheetName(e.target.value)}
          />
          <button 
          onClick={()=>setShowSectionBar(!showSectionBar)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition">
            Confirm
          </button>
        </div>

       {showSectionBar && <RecursiveSection sheetName={sheetName} />}
      </div>
    </div>
  );
}
