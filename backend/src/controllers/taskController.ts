import { Response } from "express";
import Task from "../models/Task";
import User from "../models/User"
import { Request1 } from "../middleware/authMiddleware";





export const getTasks = async (req: Request1, res: Response) => {
  // const userId = req.userId

  const userId = '66b4302f8b7598d6d2add83e'
  
  

  try {
    const user = await User.findById(userId).populate('tasks').exec();
   
    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({tasks: user.tasks});


  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch personal boards',err });
  }
  };



export  const createTask = async (req:Request,res:Response)=>{

  
  
    try {

      const userId = '66b4302f8b7598d6d2add83e'
        const{ title, description, priority, deadline, status } = req.body

        
        
        const user = await User.findById(userId);
       
        console.log(userId);
        console.log(user);


        if (!user) return res.status(404).json({ error: 'User not found' });

        
  
        
        const task = new Task({
          user: userId,
          title,
          description,
          priority,
          deadline,
          status,
        });

        const savedTask = await task.save();

        user.tasks.push(savedTask._id);
        await user.save();


        res.status(201).json({message:'task created successfully'});



    } catch (error) {
        return res.status(500).json({error: "Error creatin task"})
        console.log(error);
        
    }
}




export const updateTask = async (req:Request,res:Response) => {
  const { taskId } = req.params;
  const updateData = req.body;

  console.log(updateData);
  

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });

    return res.status(200).json({message: 'task updated successfully',task : updateTask});
  } catch (error) {
    return res.status(500).json({ error: 'Error updating task', });
  }
};



export const deleteTask = async (req:Request,res:Response) => {
  const { taskId } = req.params;
  const { userId } = req.body;


  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (task.user.toString() !== req.body.userId) {
      return res.status(403).json({ error: 'User does not have permission to delete this task' });
    }

    await Task.findByIdAndDelete(taskId);

    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

   
    return res.status(200).json({message:'Deleted Successfully'});
  } catch (error) {
    return res.status(500).json({ error: 'Error updating task', });
  }
};









