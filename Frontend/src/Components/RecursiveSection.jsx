import { useState } from "react"

export default function RecursiveSection({arr}){

    const [sectionArr,setSectionArr] = useState(arr);
    const [formData,setFormData] = useState({"1":""})
    // sectionArr - id=1,value=""


    return <>
        {
            sectionArr.map((section)=>{
                if(section.value.length === 0){
                    if(Math.ceil(section.id) === section.id){
                        return (<div key={section.id}>

                            <input onChange={(e)=>setFormData({...formData,[section.id]:e.target.value})} type="text" placeholder="Section Name" id={section.id} value={formData[section.id]}></input>
                            <button onClick={()=>setSectionArr(prev=>{ 
                             const newPrevArr = [...prev];   
                                newPrevArr.pop();
                            return  [...newPrevArr,{
                                id:section.id,
                                value:formData[section.id],
                            },{
                                 id:section.id+0.1,
                                value:"",   
                            }]
                    })}>+</button>
                        </div>)
                    }
                    else{
                          return (<div key={section.id}>
                           <input onChange={(e)=>setFormData({...formData,[section.id]:e.target.value})} 
                                  value={formData[section.id]}
                           type="text" placeholder="Question Name" id={section.id}></input>
                            <button onClick={()=>setSectionArr(prev=>{ 
                                const newPrevArr = [...prev];   
                                newPrevArr.pop();
                            return  [...newPrevArr,{
                                id:section.id,
                                value:formData[section.id],
                            },{
                                 id:section.id+0.1,
                                value:"",   
                            }]
                    })}>+</button>
                        </div>)
                    }
                }
                else{
                    if(Math.ceil(section.id) === section.id){
                        return (<div key={section.id}>
                            <div>{section.value} section</div>
                            
                        </div>)
                    }
                    else{
                          return (<div key={section.id}>
                          <div>{section.value} question</div>
                        </div>)
                    }
                }
            })
        }
         
    </>
}