import { Children } from "react";
import { useState,useContext } from "react";
import { createContext } from "react";

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
        insertInContest,searchInAllSheet
    }

    return (<TrackerContext.Provider value={values}>
        {props.children}
    </TrackerContext.Provider>
    )
}
