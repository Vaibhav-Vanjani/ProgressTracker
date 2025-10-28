import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "../Context/ProgressTrackerContext";
import { useState } from "react";

export default function ContestView(){

      const {contestSet} = useTrackerContext();
      const navigate = useNavigate();

      console.log("in contest set",contestSet);

      const [timer,setTimer] = useState();
      const [second,setSecond] = useState(0);
      const [timerForm,setTimerForm] = useState({});  
    
      function handleTimerForm(e){

        if(!(Number)(e.target.value)){
            return ;
        }

        const {name,value} = e.target;
        setTimerForm(prev=>({...prev,[name]:value}));
      }

      function handleTimer(){
        setInterval(() => {
            if(second){
                setSecond(prev=>prev-1);
            }
        }, 1000);
      }

    return <section className="flex flex-col w-screen h-screen justify-center items-start">
        <button className="mt-40" onClick={()=>navigate(-1)}>Back</button>

        <span>  Timer : 
                <input type="text" name="hour" onChange={handleTimerForm}></input> 
                <input type="text" name="minutes" onChange={handleTimerForm}></input> 
                <input type="text" name="second" onChange={handleTimerForm}></input> 
        </span>
        <button>Reset Timer</button>
        <button onClick={handleTimer}>Start Timer</button>
        <div>
            {
                contestSet?.map((question)=>{
                    return (<>
                        <span>{question.questionName}</span>
                        <span>{question.questionLink}</span>
                        <span>{question.difficulty}</span>
                    </>)
                })
            }
        </div>
    </section>
}