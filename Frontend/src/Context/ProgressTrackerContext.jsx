import { Children } from "react";
import { useState,useContext,useRef } from "react";
import { createContext } from "react";
import { useNavigate} from 'react-router-dom';

export const TrackerContext = createContext();

export const useTrackerContext = () => useContext(TrackerContext);


export default function TrackerContextProvider(props){
    console.log("inside trackercontext",Children);
    const [loading,setLoading] = useState(true);
    const [showSignupForm,setShowSignupForm] = useState(false);
    const [showLoginForm,setShowLoginForm] = useState(false);
    const [sheetArray,setSheetArray] = useState([]);
    const [sheetViewId,setSheetViewId] = useState(0);
    const [userData,setUserData] = useState(null);
    const [sheetName,setSheetName] = useState("");
    const [showSectionBar,setShowSectionBar] = useState(false);
    const [errorMessage,setErrorMessage] = useState(null);
    const [searchSet,setSearchSet] = useState([]);
    const [contestSet,setContestSet] = useState([]);
    const [searchedFor,setSearchedFor] = useState(null);
    const navigate = useNavigate();
    const ref = useRef(0);
    const inputRef = useRef(new Array(3).fill(-1));
    const [timer,setTimer] = useState();
    const [second,setSecond] = useState(false);
    const [timerForm,setTimerForm] = useState({"hour":"00","minutes":"00","second":"00"});  
    const [questionComplete,setQuestionComplete] = useState([]);
      

    function sheetViewHandler(id){
    // console.log(id,"sheetViewHandler");
    setSheetViewId(id);
  }

    async function signupFormSubmit(event,userDataObject){
        event.preventDefault();
        console.log("signupFormSubmit"); 

        async function addUser(userDataObject) {
               try{
                    setLoading(true);
                     const response = await fetch('http://localhost:3000/signup',
                       {
                        method:"POST",
                        credentials: 'include',
                        headers: 
                        {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        },
                        body: JSON.stringify(userDataObject),
                      }
                    );
                    if(!response.ok){
                        console.log(response,"uploadUserToDB-ERROR");
                        setLoading(false);
                        return ;
                    }
                    const data = await response.json();
                    console.log(data,"uploadUserToDB-SUCCESS");
                    setLoading(false);
                    alert("User Signup Success !!");
                    setShowSignupForm(false);
                     setSheetArray(data?.data?.availableSheets);
                    setSheetViewId(data?.data?.availableSheets?.[0]?._id);
                    setUserData(data?.userId);
               } 
               catch(error){
                 console.log(error,"uploadUserToDB-ERROR=catch");
               }
        }
       await addUser(userDataObject);
    }
    
    async function loginFormSubmit(event,userDataObject){
        event.preventDefault();
        console.log("loginFormSubmit",userDataObject); 

        async function loginUser(userDataObject) {
               try{
                    setLoading(true);
                     const response = await fetch('http://localhost:3000/login',
                       {
                        method:"POST",
                        credentials: 'include',
                        headers: 
                        {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        },
                        body: JSON.stringify(userDataObject),
                      }
                    );
                    if(!response.ok){
                        console.log(response,"loginUser-ERROR");
                        setLoading(false);
                        return ;
                    }
                    const data = await response.json();
                    console.log(data,"loginUser-SUCCESS");
                    setLoading(false);
                    alert("User LOGIN Success !!");
                    setShowLoginForm(false);
                     setSheetArray(data?.data?.availableSheets);
                    setSheetViewId(data?.data?.availableSheets?.[0]?._id);
                    setUserData(data?.userId);
               } 
               catch(error){
                 console.log(error,"uploadUserToDB-ERROR=catch");
               }
        }
       await loginUser(userDataObject);
    }

    // -----
     async function logOutSubmit(event){
        event.preventDefault();
        console.log("logOutSubmit"); 

        async function logOut() {
               try{
                    setLoading(true);
                     const response = await fetch('http://localhost:3000/logout',
                       {
                        method:"POST",
                        credentials: 'include',
                        headers: 
                        {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        }
                      }
                    );
                    if(!response.ok){
                        console.log(response,"logoutUser-ERROR");
                        setLoading(false);
                        return ;
                    }
                    const data = await response.json();
                    console.log(data,"logoutUser-SUCCESS");
                    setLoading(false);
                    alert("User logout Success !!");
                    setShowLoginForm(false);
                    setSheetArray(data?.data?.availableSheets);
                    setSheetViewId(data?.data?.availableSheets?.[0]?._id);
                    setUserData(null);
               } 
               catch(error){
                 console.log(error,"logoutUser-ERROR=catch");
               }
        }
       await logOut();
    }
    // -----


    function insertInContest(question){
       if(!question){
        console.log(question,"falsy question");
        return ;
       }

       if(!contestSet.find((contestquestion)=>contestquestion._id === question._id)){
         setContestSet(prev=>[...prev,question]);
       }
       else{
         console.log("already present in contest set!");
       }
    }
    
    function searchInAllSheet(event,val){
        setSearchedFor(val);
        console.log(val,"searchinallshee");
        const searchQuestionList = [];
       const questionSet = sheetArray?.forEach((sheet)=>{
            sheet?.section?.forEach((section)=>{
                section?.subsection?.forEach((subsection)=>{
                    // console.log(subsection?.questionName,"not hi");
                       if(val && subsection?.questionName?.includes(val)){
                            console.log(subsection?.questionName,"hi");
                            searchQuestionList.push(subsection);    
                       }
                })
            })
        })
        // console.log(questionSet,"questionSet");
        setSearchSet(searchQuestionList);
    }

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

      function disableTimerFields(isdisable)
      {
        inputRef.current.forEach(element => {
          console.log(element,"inside inputref");
          if(element)
          {
            element.disabled = isdisable;
          }
          return;
        });
        return true;
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
        currentContestTimeInSeconds && disableTimerFields(true) && setSecond(prev=>!prev);
      }
      

      function questionCompleteHandler(questionId){
        if(questionComplete.length === (contestSet.length-1)){
            clearInterval(ref.current); 
            disableTimerFields(false); 
            alert("Contest Completed YAYYY!!")
        }

        setQuestionComplete(prev=>[...prev,questionId]);
      }

    const values = {
        loading,setLoading,
        showSignupForm,setShowSignupForm,
        showLoginForm,setShowLoginForm,
        signupFormSubmit,loginFormSubmit,
        sheetArray,setSheetArray, 
        sheetViewId,setSheetViewId,
        userData,setUserData,
        sheetViewHandler,
        sheetName,setSheetName,
        showSectionBar,setShowSectionBar,
        errorMessage,setErrorMessage,
        logOutSubmit,
        searchSet,setSearchSet,
        contestSet,setContestSet,
        searchedFor,setSearchedFor,
        insertInContest,searchInAllSheet,
        navigate,ref,
        inputRef,
        timer,setTimer,
        second,setSecond,
        timerForm,setTimerForm,
        questionComplete,setQuestionComplete,
        handleTimerForm,disableTimerFields,
        handleTimer,questionCompleteHandler
    }

    return (<TrackerContext.Provider value={values}>
        {props.children}
    </TrackerContext.Provider>
    )
}
