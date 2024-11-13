import express from 'express';
import { getFavPetsController, getUserInfoController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:id', getUserInfoController);

router.get('/:id/fav-pets', getFavPetsController);



export default router;