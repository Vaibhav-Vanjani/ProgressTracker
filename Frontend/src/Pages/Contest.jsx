import { useState } from "react";
import { useTrackerContext } from "../Context/ProgressTrackerContext";
import { useNavigate } from "react-router-dom";

export default function Contest(){
    const {sheetArray,searchSet,setSearchSet,
        contestSet,setContestSet,
        searchedFor,setSearchedFor,insertInContest,searchInAllSheet} = useTrackerContext();
    const navigate = useNavigate();
    console.log(contestSet.length,"in contest");

    return (
  <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 p-8">
    {/* Title */}

     <div className="w-full flex justify-start">
        <button
          onClick={()=>navigate(-1)}
          className="mt-14 flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg shadow-sm transition-all duration-200 hover:translate-x-[-2px]"
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

    <h1 className="mb-8 mt-10 text-3xl font-bold text-gray-800 tracking-tight">
      🔍 Pick Question
    </h1>

    {/* Search Input */}
    <div className="w-full max-w-lg relative mb-10 flex justify-center">
      <input
        type="text"
        placeholder="Type to search questions..."
        onChange={(e) => searchInAllSheet(e, e.target.value)}
        value={searchedFor}
        className="
          w-3/5 px-5 py-3
          rounded-2xl
          border border-gray-200
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
          bg-white/70 backdrop-blur-sm
          text-gray-700 placeholder-gray-400
          transition-all duration-200
        "
      />
      <button
        onClick={()=>navigate("/contest-view")}
        className="
            ml-3 px-5 py-2.5
            bg-green-500
            text-white font-large text-md
            rounded-lg
            shadow-md
            hover:bg-green-600
            hover:shadow-lg
            active:scale-95
            transition-all duration-200
            cursor-pointer
        "
        >
          {
          contestSet?.length 
            ? <span
            className="absolute
                -top-2 right-3
                bg-red-500
                text-white text-xs font-bold
                px-2 py-[2px]
                rounded-full
                shadow-md shadow-red-200/50
                ring-2 ring-white">
                    {contestSet.length}
            </span>
            :
            ""
            }

           {"Move to Contest"}
        </button>

    </div>

    {/* Results */}
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      
        <p className="col-span-full text-gray-500 text-center text-md italic">
          Search Result for : {searchedFor}
        </p>
            
            {searchSet.map((question) => (
  <div
    onClick={() => insertInContest(question)}
    key={question._id}
    className={`
      rounded-2xl
      p-5
      shadow-md
      border border-gray-100
      hover:shadow-xl hover:scale-105
      transition-all duration-200
      cursor-pointer
      text-gray-800 
      bg-grey-500/50
      flex justify-between items-center
    `}
  >
    {/* Left: Question Name */}
    <div className={"flex-1"}>
      <h3 className="font-semibold text-indigo-600 text-lg mb-2 line-clamp-2">
        {question.questionName}
      </h3>
    </div>

    {/* Right: Info + Action */}
    <div className="flex items-end gap-2">
            <span
                className={`
                px-2 py-1 text-xs font-medium rounded-full
                ${question.difficulty === "Easy" ? "bg-green-100 text-green-700" : 
                    question.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" : 
                    "bg-red-100 text-red-700"}
                `}
            >
                {question.difficulty}
            </span>
            {contestSet?.find((ques)=>ques._id===question._id)  
                ? (<button 
                onClick={()=>setContestSet(prev=>{
                    const newPrev = [...prev];
                    return newPrev.filter((item)=>item._id!==question._id)
                })}    
                className="
                bg-red-500 text-white px-3 py-1 rounded-lg
                text-sm font-medium
                hover:bg-red-600 hover:shadow-md
                transition-all duration-200
            ">
                {"Remove"}
            </button>) 
            :
            (<button className="
                bg-indigo-500 text-white px-3 py-1 rounded-lg
                text-sm font-medium
                hover:bg-indigo-600 hover:shadow-md
                transition-all duration-200
            ">
                {"Pick"}
            </button>) }
            
            </div>
        </div>
        ))}

    </div>
  </div>
);

}