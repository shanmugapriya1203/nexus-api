import express from 'express';
import { isAdmin } from '../utils/authMiddleware.js';
import { assignTaskToVolunteer, completeTask, creatTask, deleteTask, getAllTasksWithCount, getAllVolunteers, getTaskById, getVolunteerById, updateTask } from '../controllers/volunteerController.js';
const router = express.Router();

router.get('/',isAdmin, getAllVolunteers);
router.get('/:volunteerId', isAdmin,getVolunteerById);
router.post('/createtask',isAdmin,creatTask)
router.get('/tasks',isAdmin,getAllTasksWithCount)
router.post('/tasks/assign', isAdmin, assignTaskToVolunteer);
router.get('/tasks/:taskId',getTaskById);
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId',isAdmin, deleteTask);
router.put('/tasks/:taskId/complete', isAdmin, completeTask);

export default router