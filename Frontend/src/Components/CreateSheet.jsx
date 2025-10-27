import { useState } from "react";
import RecursiveSection from "./RecursiveSection";
import { useTrackerContext } from "../Context/ProgressTrackerContext";
import { useNavigate } from "react-router-dom";

export default function CreateSheet() {
   const {sheetName,setSheetName,
        showSectionBar,setShowSectionBar,
        errorMessage,setErrorMessage} = useTrackerContext();
  const navigate = useNavigate();
  return (
    <>
    
    <div className="mt-4 min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
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
      <div className="mt-4 bg-white shadow-md rounded-lg p-6 w-full sm:w-[600px]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create a New Sheet
        </h1>

        <div className="flex gap-3 mb-6">
          {!showSectionBar ? 
          (<input
            type="text"
            placeholder="Sheet Name"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>setSheetName(e.target.value)}
            value={sheetName}
          />) 
          :
           (
           <div
            className="flex-1 rounded-md border border-gray-200 
                      bg-gray-100 text-gray-500
                      px-3 py-2 shadow-sm
                      cursor-not-allowed pointer-events-none select-none"
          >
            {sheetName}
          </div>
           ) 
          }
          {!showSectionBar ? 
          <button 
          onClick={()=>{
          if(!setSheetName || !sheetName.trim().length){
              setErrorMessage("Sheet Name cannot be blank !");
              return ;
          } setShowSectionBar(true); }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition">
            Confirm
          </button>
          :
          <button 
          onClick={()=>{setShowSectionBar(false); }}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition">
            Edit
          </button>
          }
        </div>

       {<RecursiveSection sheetName={sheetName} errorMessage={errorMessage} />}
      </div>
    </div>
  </>);
}
