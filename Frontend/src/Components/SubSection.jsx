export default function({item,arr,handleSubSectionShow}){
    return ( 
            <h2 className="flex justify-between text-xl font-semibold text-blue-600 border-b pb-2 mb-4">
              {item.subsectionName}
               {arr.includes(item._id) 
               ?
                <span onClick={()=>handleSubSectionShow(item._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                 </span>
                :
                <span onClick={()=>handleSubSectionShow(item._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
                </span>
               
               }
              
            </h2>
    )
}