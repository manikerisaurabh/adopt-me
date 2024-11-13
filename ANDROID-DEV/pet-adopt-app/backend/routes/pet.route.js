import express from 'express';
import { addNewPetController, addToFavController, getAllPetsController, searchAnythingController } from '../controllers/pet.controller.js';

const router = express.Router();

router.get('/', getAllPetsController);

router.post("/add", addNewPetController);

router.post('/:petId/add-to-fav', addToFavController)

router.get("/search-anything/:searchQuery", searchAnythingController)

export default router;