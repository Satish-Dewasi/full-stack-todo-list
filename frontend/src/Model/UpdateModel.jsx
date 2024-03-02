import React, {useRef, useState} from 'react'
import { LiaEditSolid } from "react-icons/lia";


function UpdateModel({updateFunc,taskToUpdate,setTaskToUpdate,closePopUp}) {

    const [task, setTask] =useState(taskToUpdate);

    const updateTask = (e)=>{
        setTaskToUpdate(e.target.value)
    }

    const cancelBTN = ()=>{
        closePopUp();
    }

    const updateBTN =()=>{
         updateFunc();
         closePopUp();
         
    }



  return (
    <div    className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ' >
          
          <div className='px-2 w-[350px] h-[300px] flex flex-col items-center gap-5   bg-green-100 rounded-sm' >
            
            <LiaEditSolid className=' mt-4 text-blue-400 text-7xl ' />
            <h1 className=' text-[15px] font-sans font-semibold' >Edit Task and Press Update.</h1>

            <input value={taskToUpdate} onChange={updateTask} type="text" className='text-[20px] p-2 w-[90%]  focus:outline-0 ' />

            <div className='mt-6 text-white font-sans text-[18px]  w-[75%] flex items-center justify-between' >

                <button onClick={cancelBTN}  className='bg-gray-400 py-1 px-4 rounded-sm' >Cancel</button>
                <button onClick={updateBTN}  className='bg-blue-400 py-1 px-4 rounded-sm' >Update</button>
            </div>

          </div>

    </div>
  )
}

export default UpdateModel