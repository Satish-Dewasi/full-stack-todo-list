const express = require('express');
const router = express.Router();
const Task = require('../Model/taskModel')



//post endpoint to store data in database
router.post('/', async(req,res)=>{

    try {
        console.log(req.body);
        const newTask = new Task(req.body);
        const response = await newTask.save();
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({success: false, message:"Error in saving data"})
    }
})

//get endpooint to fatch data to frontend

router.get('/', async(req,res)=>{
    try {
        const response = await Task.find();
        res.status(200).json(response);

        
    } catch (error) {
        res.status(500).json({success: false, message:"Error in saving data"})
    }
})

// delete task enddpoint

router.delete('/:id', async (req, res) => {
    try {
        const taskID = req.params.id;
        const response = await Task.findByIdAndDelete(taskID);
        if (!response) {
            return res.status(404).json({ error: "Invalid id or document not found" });
        }
        res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error while deleting task" });
    }
});


//updata endpoint
router.put('/:id', async (req, res) => {
    try {
        const taskID = req.params.id;
        const dataToUpdate= req.body;
        const response = await Task.findByIdAndUpdate(taskID, dataToUpdate);
        if (!response) {
            return res.status(404).json({ error: "Invalid id or document not found" });
        }
        res.status(200).json({ success: true, message: "Task Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error while updating task" });
    }
});



module.exports =router;