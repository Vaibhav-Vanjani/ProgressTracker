import RecursiveSection from "./RecursiveSection";

export default function CreateSheet(){
    return (<>
        <div> 
            <input type="text" placeholder="Sheet Name"></input>
            <button>Confirm</button>

            <RecursiveSection arr={[{id:1,value:""}]}/>   
        </div>
    </>)
}   