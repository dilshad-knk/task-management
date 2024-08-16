import { Router } from "express";
import { createUser, login } from "../controllers/userController";
import {verify} from "../middleware/authMiddleware"

const router = Router();

router.post('/register',createUser)
router.post('/login',verify,login)



export default router;
