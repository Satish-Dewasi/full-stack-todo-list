
import './App.css'
import { useEffect, useState } from 'react';
import Axios from 'axios'
import Model from './Model/Model';
import UpdateModel from './Model/UpdateModel';



function App() {

const [listData , setListData]= useState([])
const [task, setTask]= useState("");
const [showDeleteModel, setShowDeleteModel ]=useState(false);

const [id, setId]= useState("");


//fatching data from database and storing in listData

const fatchData = async()=>{
  const response = await Axios.get("http://localhost:5000/task"); 
  setListData(response.data)
}

// rerendering app if any change made in task 
useEffect(()=>{
  fatchData()
},[])


// add task functionality

const addTaskFunction= (e)=>{
  setTask(e.target.value); 
}

const addButton= async()=>{
   
   if(task === ''){
    return alert("Empty task !")
   }
   const response = await Axios.post("http://localhost:5000/task", {name: task});  
   setTask("");
   fatchData();
}

//delete functionlity 

const deleteTask= async (e) => {
   const taskId = id;
    try {
      
      const response = await Axios.delete(`http://localhost:5000/task/${taskId}`);

   } catch (error) {
       console.log("Error while deleting taks.");
   }
   fatchData()
}

const showPopUp = (e)=>{
   setId(e.target.name)
   setShowDeleteModel(true)
}


//updating task
const [showUpdateModel, setShowUpdateModel ]=useState(false);
const [taskToUpdate, setTaskToUpdate]=useState("");
const [idForUpdate, setIdForUpdate]= useState("");

const update = (e)=>{
  setTaskToUpdate(e.target.value)
  setIdForUpdate(e.target.name)
  setShowUpdateModel(true)
}

// axios update function 
const updateTask= async (e) => {
   const taskId = idForUpdate;
    try {
      console.log(taskToUpdate);
      const response = await Axios.put(`http://localhost:5000/task/${taskId}`, {name:taskToUpdate});
      console.log(response);

   } catch (error) {
       console.log("Error while updating task.");
   }
   fatchData()
}


//done or not

const IsPending= async (e) => {
   
   const taskId = e.target.name;

   const updatedStatus = e.target.value === "true" ? false : true;
    
    try {
      const response = await Axios.put(`http://localhost:5000/task/${taskId}`, {status:updatedStatus});

   } catch (error) {
       console.log("Error while updating task.");
   }
   fatchData()
}


  return (
    <div className='app  w-full h-auto min-h-screen bg-black  flex items-center justify-center ' >

        {/* Model? */}
       { showDeleteModel && <Model deleteData= {deleteTask} closePopUp= {()=>setShowDeleteModel(false)} />}
       {showUpdateModel && <UpdateModel updateFunc= {updateTask} taskToUpdate = {taskToUpdate}setTaskToUpdate={setTaskToUpdate}  closePopUp= {()=>setShowUpdateModel(false)} /> }
       
      <div className="container w-[60%] h-fit min-h-[80vh] rounded-md shadow-lg shadow-gray-400">

        {/* top blue div? */}
        <div className='w-full rounded-t-md h-[25vh] bg-blue-400 flex flex-col items-center justify-center gap-10 ' >
          
          <div className='w-[90%] flex items-center justify-center'>
            <h1 className='font-sans text-white text-4xl font-semibold' >TODO LIST</h1>
            
          </div>

          <div className='w-[90%] flex items-center justify-between gap-5' >
            <input value={task} onChange={addTaskFunction} className='w-[88%] bg-gray-900   h-9 text-[16px] rounded-sm  p-2 focus:border-0 focus:outline-0  ' placeholder='Write your todo list here...' type="text" />
            <button onClick={addButton} className=' w-[10%] h-9 shadow-md  rounded-sm text-[16px]  px-3  bg-gray-900 ' >ADD</button>
          </div>

        </div>

        {/* //LIST */}

        <div className='w-full pb-5 h-auto min-h-[40vh]  mt-5 flex flex-col items-center justify-start gap-4' >
          <h2 className='text-2xl font-bold font-sans uppercase  ' >List of work to do:</h2>
           
          {/* Do to listed here  */}

          <ul className=' w-full h-auto flex flex-col items-center justify-center gap-4 ' >

             {
              listData.map((obj)=>(
                <li key={obj._id} className=' bg-gray-700 px-4 m-auto rounded-sm flex items-center justify-between w-[98%] h-[45px]'>
                     <p className={obj.status  ? 'line-through font-sans text-xl' : 'font-sans text-xl' } >{obj.name}</p> 
                     <div className='flex items-center gap-4' >
                         
                        {/* completed */}
                        <button onClick={IsPending} name={obj._id} value={obj.status}  className='font-sans text-blue-500 text-[15px] font-bold'>
                           ✔ 
                        </button>

                        {/* edit */}
                        <button onClick={update} name={obj._id} value={obj.name} className='font-sans text-black-500 text-[15px] font-bold' >EDIT</button>
                        
                        {/* delete */}
                         <button name={obj._id} onClick={showPopUp} className='font-sans text-red-500 text-[15px] font-bold' >
                           X
                         </button>

                     </div>

                </li>
              ))
             }

            
          </ul>


        </div>


      </div>
        
    </div>
  )
}

export default App
