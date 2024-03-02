import React, { useRef } from 'react'
import { TiDeleteOutline } from "react-icons/ti";
import { MdCancel } from "react-icons/md";





function Model({closePopUp, deleteData}) {

    const cancelBTN = ()=>{
        closePopUp();
    }

    const deleteBTN =()=>{
         deleteData();
         closePopUp();
         
    }

    const modelRef = useRef();
    const closeModel = (e)=>{
        if(modelRef.current === e.target){
            cancelBTN();
        }
    }

  return (
    <div ref={modelRef}  onClick={closeModel} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ' >
          
          <div className='px-2 w-[350px] h-[300px] flex flex-col items-center   bg-white rounded-sm' >
            
            <TiDeleteOutline className=' mt-4 text-red-400 text-7xl ' />

            <h1 className='mt-4 text-[22px] font-sans font-semibold' >Are you sure?</h1>
            <p className='mt-4 text-center' >Do you really want to delete these task? This process cannot be undone.</p>

            <div className='mt-6 text-white font-sans text-[18px]  w-[80%] flex items-center justify-between' >

                <button onClick={cancelBTN} className='bg-gray-400 py-1 px-4 rounded-sm' >Cancel</button>
                <button onClick={deleteBTN} className='bg-red-400 py-1 px-4 rounded-sm' >Delete</button>
            </div>

          </div>

    </div>
  )
}

export default Model