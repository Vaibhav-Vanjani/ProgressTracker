import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import SheetCollection from './Components/SheetCollection.jsx';
import CreateSheet from './Components/CreateSheet.jsx';
import SheetView from './Components/SheetView.jsx';

function App() {
  const [sheetArray,setSheetArray] = useState([]);
  const [sheetViewId,setSheetViewId] = useState(0);

  useEffect(()=>{
   try {
     async function getSheets(){
        const response = await fetch('http://localhost:3000/sheet');
        if(!response.ok){
          return ;
        }
        const data = await response.json();
        console.log(data.data);
        setSheetArray(data?.data);
        setSheetViewId(data?.data[0]?._id);
        console.log(data);
    }
    getSheets();

    console.log("useeffect");
   } catch (error) {
      console.log(error);
   }
  },[])


  function sheetViewHandler(id){
    // console.log(id,"sheetViewHandler");
    setSheetViewId(id);
  }


  if(!sheetArray?.length){
    return <>Loading ... </>;
  }

  return (
    <>
      {/* {JSON.stringify(sheetArray)} */}
      {/* <LoginBlocker/> */}
      <SheetCollection sheet={sheetArray} sheetViewHandler={sheetViewHandler}/>
      <SheetView sheet={sheetArray} sheetViewId ={sheetViewId}/>
      <CreateSheet/>
    </>
  )
}

export default App
