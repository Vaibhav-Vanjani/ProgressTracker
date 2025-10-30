import { useTrackerContext } from "../Context/ProgressTrackerContext";
export default function TimerDisplay(){
  

          const { second,
                  inputRef,
                  timerForm,
                  handleTimerForm,
                  setTimerForm,
                  handleTimer,
                  setSecond,
                  ref,
                  disableTimerFields
                } = useTrackerContext();
    
  
      console.log("second",second);

    return ( 
    <>
    <div className="flex flex-col items-center mt-20">
      <div className="flex items-center space-x-2 text-lg font-medium">
        <span className="text-gray-600">Timer:</span>

        <input
          ref={(el)=>inputRef.current[0]=el}
          className="text-center bg-white border border-gray-300 rounded-md w-12 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="text"
          name="hour"
          value={timerForm["hour"]}
          onChange={handleTimerForm}
        />

        <span className="text-gray-600">:</span>

        <input
          ref={(el)=>inputRef.current[1]=el}
          className="text-center bg-white border border-gray-300 rounded-md w-12 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="text"
          name="minutes"
          value={timerForm["minutes"]}
          onChange={handleTimerForm}
        />

        <span className="text-gray-600">:</span>

        <input
          ref={(el)=>inputRef.current[2]=el}
          className="text-center bg-white border border-gray-300 rounded-md w-12 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          type="text"
          name="second"
          value={timerForm["second"]}
          onChange={handleTimerForm}
        />
      </div>
    </div>
     <div className="flex space-x-4 mt-6">
      {second ? 
      (
        <button
          className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          onClick={() => {clearInterval(ref.current); disableTimerFields(false); setSecond(prev=>!prev); setTimerForm({"hour":"00","minutes":"00","second":"00"})}}
        >
          Reset Timer
        </button>
      )
      :
      (
        <button
          className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={handleTimer}
        >
          Start Timer
        </button>
      )
      }
    </div>  
    </>
  )
}