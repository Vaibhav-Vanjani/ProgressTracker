import { useState } from "react";
import SubSection from "./SubSection";
import QuestionCollection from "./QuestionCollection";

export default function SheetView({ sheet , sheetViewId }) {
   
    
  const pickedSheet = sheet?.filter((currentSheet)=>currentSheet._id === sheetViewId);  
  console.log(pickedSheet,"pickedSheet");
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
    <section className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
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
            arr.includes(item._id) && <QuestionCollection questionList={item.subsection}/> :  
            (
              <p className="text-gray-500 text-sm italic">No questions available.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No sections available.</p>
      )}
    </section>
  );
}
