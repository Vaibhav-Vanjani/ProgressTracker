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
    }

    return (<TrackerContext.Provider value={values}>
        {props.children}
    </TrackerContext.Provider>
    )
}
