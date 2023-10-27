import { Router } from "express";
import { messagesManager } from '../dao/managers/messagesManager.js'

const router = Router();

router.post('/', async (req, res) => {
    try {
        const response = await messagesManager.createOne(req.body)
        return res.status(200).json({ message: "saved message"})
    } catch (error) {
        
    }
})

export default router;