import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "../Context/ProgressTrackerContext";
import { useEffect, useState ,useRef } from "react";

export default function ContestView(){



      const {contestSet} = useTrackerContext();
      const navigate = useNavigate();
      const ref = useRef(0);
      console.log("in contest set",contestSet);

      const [timer,setTimer] = useState();
      const [second,setSecond] = useState(0);
      const [timerForm,setTimerForm] = useState({"hour":"00","minutes":"00","second":"00"});  
    
        // useEffect(()=>{
        //     let hours = Math.floor(second/(60*60));
        //     let minutes = Math.floor(second/(60));
        //     let seconds = Math.floor(second%60);

        //     if((String)((Number)(hours)).length===1){
        //         hours = "0" + hours;
        //     }
        //     if((String)((Number)(minutes)).length===1){
        //         minutes = "0" + minutes;
        //     }
        //     if((String)((Number)(seconds)).length===1){
        //         seconds = "0" + seconds;
        //     }
            
        //     setTimerForm(prev=>({hour:hours,minutes:minutes,second:seconds}))
        //     handleTimer();
        // },[second])
     
    
    
      function handleTimerForm(e){
        if(((Number)(e.target.value) !== 0) && !(Number)(e.target.value) && (String)(e.target.value).length){
            return ;
        }
        let {name,value} = e.target;
        if((Number)(value)>60){
            value = Math.floor((Number)(value)/10);
            if((String)(value).length==1){
                value = "0" + value;
            }
        }
        else if((Number)(value)<10){
            value = "0" + (Number)(value);
        }
        else{
            if((String)((Number)(value)).length>2){
                return;
            }
            value = (String)((Number)(value));
        }
        setTimerForm(prev=>({...prev,[name]:(String)(value)}));
        return; 
      }

      function handleTimer(){
        const currentContestTimeInSeconds = 60*60*(Number)(timerForm["hour"]) + 60*(Number)(timerForm["minutes"]) + (Number)(timerForm["second"]);
       const timeIntervalId = setInterval(() => {
            if(currentContestTimeInSeconds){
                setTimerForm(prev=>{
                    let second = 60*60*(Number)(prev["hour"]) + 60*(Number)(prev["minutes"]) + (Number)(prev["second"]) - 1;
                    if(!second){
                        clearInterval(timeIntervalId);
                    }
                    let hours = Math.floor(second/(60*60));
                    let minutes = Math.floor((second % 3600) / 60);  // 3675 --> minutes edge case 
                    let seconds = Math.floor(second%60);

                    console.log(prev["hour"] ,(prev["minutes"]) ,(prev["second"]), second);
                    if((String)((Number)(hours)).length===1){
                        hours = "0" + hours;
                    }
                    if((String)((Number)(minutes)).length===1){
                        minutes = "0" + minutes;
                    }
                    if((String)((Number)(seconds)).length===1){
                        seconds = "0" + seconds;
                    }
                    return {...prev,["hour"]:hours,["minutes"]:minutes,["second"]:seconds}
                })
            }
        }, 1000);
        ref.current = timeIntervalId;
      }

   return (
  <section className="flex flex-col w-screen h-screen justify-center items-center bg-gray-50 text-gray-800 px-4">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mt-20 absolute top-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-all"
    >
      ← Back
    </button>

    {/* Timer Display */}
    <div className="flex flex-col items-center mt-20">
      <span className="text-4xl font-semibold tracking-wide text-gray-700 mb-3">
        {second}s
      </span>

      <div className="flex items-center space-x-2 text-lg font-medium">
        <span className="text-gray-600">Timer:</span>

        <input
          className="text-center bg-white border border-gray-300 rounded-md w-12 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="text"
          name="hour"
          value={timerForm["hour"]}
          onChange={handleTimerForm}
        />

        <span className="text-gray-600">:</span>

        <input
          className="text-center bg-white border border-gray-300 rounded-md w-12 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="text"
          name="minutes"
          value={timerForm["minutes"]}
          onChange={handleTimerForm}
        />

        <span className="text-gray-600">:</span>

        <input
          className="text-center bg-white border border-gray-300 rounded-md w-12 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="text"
          name="second"
          value={timerForm["second"]}
          onChange={handleTimerForm}
        />
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex space-x-4 mt-6">
      <button
        className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        onClick={() => clearInterval(ref.current)}
      >
        Reset Timer
      </button>

      <button
        className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        onClick={handleTimer}
      >
        Start Timer
      </button>
    </div>

    {/* Contest Questions List */}
    <div className="flex w-full justify-center mt-10">
      <div className="w-3/4 max-w-3xl bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Contest Questions
        </h2>

        {contestSet?.length ? (
          contestSet.map((question) => (
            <div
              key={question._id}
              className="flex justify-between items-center border-b border-gray-200 py-3 px-2 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {question.questionName}
                </p>
                <a
                  href={question.questionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline"
                >
                  {question.questionLink}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {question.difficulty}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                  Completed
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No questions in this contest yet.
          </p>
        )}
      </div>
    </div>
  </section>
);

}