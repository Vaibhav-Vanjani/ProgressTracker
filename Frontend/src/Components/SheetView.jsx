import { useContext, useState } from "react";
import SubSection from "./SubSection";
import QuestionCollection from "./QuestionCollection";
import { useNavigate, useParams } from "react-router-dom";
import { useTrackerContext } from "../Context/ProgressTrackerContext";
import CreateSheet from "./CreateSheet";

export default function SheetView() {
  const params = useParams(); 
  const navigate = useNavigate();
  const {sheetArray} = useTrackerContext();
  const pickedSheet = sheetArray?.filter((currentSheet)=>currentSheet._id === params.sheetId);  
  console.log(pickedSheet,"pickedSheet");

  if(!pickedSheet?.length){
    return <CreateSheet/>
  }

  const [arr,setArr] = useState([]);
  function handleSubSectionShow(id){
   
    if(arr.includes(id)){
       
        const newArr = arr.filter(arrId=> {
            return id !== arrId});
        setArr([...newArr]);
    }
    else{
        setArr([...arr,id]);
    }

     console.log(id,"inside handleSubSectionShow",arr);
  } 
  

  return (
    <>
    
    <section className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
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

      {Array.isArray(pickedSheet) && pickedSheet[0]?.section?.length ? (
        pickedSheet[0].section.map((item, idx) => (
          <div
            key={item._id}
            className="w-full max-w-4xl bg-white rounded-xl shadow-md border border-gray-200 mb-8 p-6"
          >
            {/* Subsection Title */}
           <SubSection item={item} arr={arr} handleSubSectionShow={handleSubSectionShow}/>

            {/* Questions List */}
            {item?.subsection?.length ? 
            !arr.includes(item._id) && <QuestionCollection subsectionId={item._id} sheetId={params.sheetId} questionList={item.subsection}/> :  
            (
              <p className="text-gray-500 text-sm italic">No questions available.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No sections available.</p>
      )}
    </section>
    </>
  );
}
