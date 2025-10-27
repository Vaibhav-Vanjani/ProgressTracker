import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import Navbar from './Components/NavBar.jsx';
import Form from './Components/Form.jsx';
import { useTrackerContext } from './Context/ProgressTrackerContext.jsx';
import Home from './Pages/Home.jsx';
import { Outlet, Route ,Routes, useNavigate} from 'react-router-dom';
import SheetCollection from './Components/SheetCollection.jsx';
import SheetView from './Components/SheetView.jsx';
import CreateSheet from './Components/CreateSheet.jsx';

function App() {
 
  const {sheetArray,setSheetArray, 
        sheetViewId,setSheetViewId,
        userData,setUserData,sheetViewHandler} = useTrackerContext();
  const navigate = useNavigate();

  useEffect(()=>{
   try {
     async function getSheets(){
        const response = await fetch('http://localhost:3000/sheet',{
          method:"GET",
          credentials: 'include',
        });
        if(!response.ok){
          return ;
        }
        const data = await response.json();
        console.log(data.data);
        setSheetArray(data?.data?.availableSheets);
        setSheetViewId(data?.data?.availableSheets?.[0]?._id);
        setUserData(data?.userId);
        console.log(data);
    }
    getSheets();

    console.log("useeffect");
   } catch (error) {
      console.log(error);
   }
  },[])

  if(!sheetArray?.length){
    navigate('/Home');
  }

  return (
    <>
      {/* {JSON.stringify(sheetArray)} */}
      {/* <LoginBlocker/> */}
      

      <Navbar></Navbar>
      <Form></Form>
      <Routes>
        <Route path='/' element={<Outlet/>}>
          <Route index element={<Home></Home>}></Route>
          <Route path='/:sheetId' element={<SheetView/>}></Route>
          <Route path='*' element={<CreateSheet/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
