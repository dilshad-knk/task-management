import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController';

const router = express.Router();


router.post('/tasks/create', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);

export default router;
