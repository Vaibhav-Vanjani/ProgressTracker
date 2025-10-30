import { useTrackerContext } from "../Context/ProgressTrackerContext"

export default function CustomContestGenerator(){

    const {sheetArray} = useTrackerContext();

    console.log("sheetArray",sheetArray);

    return (<>
        
    </>)
}