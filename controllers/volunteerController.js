import User from "../models/User.js";
import Task from "../models/Task.js";

export const getAllVolunteers = async (req, res) => {
    try {
      const volunteers = await User.find({ role: 'volunteer' }).populate('assignedTasks');
      res.status(200).json(volunteers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const getVolunteerById = async (req, res) => {
    try {
        const { volunteerId } = req.params;
        const volunteer = await User.findOne({ _id: volunteerId, role: 'volunteer' }).populate('assignedTasks');
        
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        
        res.status(200).json(volunteer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const creatTask= async(req,res)=>{
    try {
        const {name,description,status} = req.body
        const newTask = new Task({
            name,
            description,
            assignedVolunteer: null,
            status: status || 'pending',
          });
          const savedTask = await newTask.save();
          res.status(201).json({ message: 'Task created successfully', task: savedTask });

    } catch (error) {
          console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }
}


export const getAllTasksWithCount = async (req, res) => {
    try {
      const tasks = await Task.find();
      const taskCount = await Task.countDocuments();
      res.status(200).json({ tasks, taskCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { name, description } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { name, description },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


  export const assignTaskToVolunteer = async (req, res) => {
    try {
        const { taskId, volunteerId } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { assignedVolunteer: volunteerId },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedVolunteer = await User.findByIdAndUpdate(
            volunteerId,
            { $addToSet: { assignedTasks: taskId } }, 
            { new: true }
        );

        if (!updatedVolunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.status(200).json({ message: 'Task assigned successfully', task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const completeTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { status: 'completed' },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task completed successfully', task: updatedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };