import { useTrackerContext } from "../Context/ProgressTrackerContext.jsx"
import SheetCollection from '../Components/SheetCollection.jsx';
import CreateSheet from '../Components/CreateSheet.jsx';
import SheetView from '../Components/SheetView.jsx';

export default function Home(){
    const {sheetArray,sheetViewHandler,sheetViewId} = useTrackerContext();
    return <>
         <SheetCollection sheet={sheetArray} sheetViewHandler={sheetViewHandler}/>
    </>
}