import express from "express";
import { login, verifyToken, register, visitors_Get, visitor_Get_By_Id, update_data, delete_data } from '../controllers/visitor.js'

const router = express.Router();
router.post('/login', login);
router.get('/verify', verifyToken)
router.post('/register', register);
router.get('/', visitors_Get);
router.get('/:id', visitor_Get_By_Id)
router.put('/update/:id', update_data)
router.delete('/delete/:id', delete_data)
export default router;