import connectToDb from "../db/connectToDb.js";
import Pet from '../models/pet.model.js';
import User from "../models/user.model.js";


export const getAllPetsController = async (req, res) => {
    try {
        await connectToDb();
        console.log("get all pet route hit")
        const allPets = await Pet.find({});

        if (allPets.length == 0) {
            return res.status(401).json({
                error: "No pet available"
            })
        }

        return res.status(201).json({
            data: allPets
        })

    } catch (error) {
        console.log("Error in getAllPetsController : ", error.message)
    }
}



export const addNewPetController = async (req, res) => {
    try {
        await connectToDb();

        const { name, type, breed, age, size, gender, color, location, description, image, addedBy } = req.body;

        // Create and save the new pet to the database
        const newPet = new Pet({
            name,
            type,
            breed,
            age,
            size,
            gender,
            color,
            location,
            description,
            image,
            listedBy: addedBy
        });
        await newPet.save();

        // Find the user and update their petsAdded array
        const user = await User.findById(addedBy);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the new pet to the user's petsAdded array
        user.petsAdded.push({ pet: newPet._id, adopted: false });
        await user.save(); // Save the updated user

        res.status(201).json({ message: 'Pet added successfully', data: newPet });
    } catch (error) {
        console.log("Error in addNewPetController : ", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



export const addToFavController = async (req, res) => {
    const { petId } = req.params;
    const { userId } = req.body;
    console.log('req reached at addToFavController')
    try {
        await connectToDb();
        // Check if the pet exists
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Find the user and add the pet to favPets array if not already added
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the pet is already in the user's favorites
        const isFavorite = user.favPets.some(fav => fav.petId.toString() === petId);
        if (isFavorite) {
            return res.status(400).json({ message: 'Pet is already in favorites' });
        }

        // Add pet to favPets array
        user.favPets.push({ petId });
        await user.save();

        res.status(200).json({ message: 'Pet added to favorites', favPets: user.favPets });
    } catch (error) {
        console.log("Error in addToFavController:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




export const searchAnythingController = async (req, res) => {
    const { searchQuery } = req.params;
    try {

        await connectToDb();

        const resultantPets = await Pet.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { type: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        console.log({ resultantPets })
        res.status(201).json(resultantPets)

    } catch (error) {

    }
}