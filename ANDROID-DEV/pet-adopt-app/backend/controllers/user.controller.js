import connectToDb from "../db/connectToDb.js";
import User from "../models/user.model.js";

export const getUserInfoController = async (req, res) => {
    const { id } = req.params;
    try {
        console.log("Request received with id", id);
        await connectToDb();

        // Find user by ID and populate 'petsAdded.pet' field
        const user = await User.findById(id).populate({
            path: 'petsAdded.pet',
            model: 'Pet'
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        return res.status(200).json({
            user
        });
    } catch (error) {
        console.log("Error in getUserInfoController:", error.message);
        return res.status(500).json({
            error: "An error occurred while retrieving user information"
        });
    }
};



export const getFavPetsController = async (req, res) => {
    const { id } = req.params;
    console.log('getFavPetsController hit with id ', id)
    try {
        await connectToDb();

        // Find the user by ID and populate the 'favPets.petId' field
        const user = await User.findById(id).populate('favPets.petId');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract populated favorite pets
        const favPets = user.favPets.map(fav => fav.petId);
        console.log({ favPets })
        res.status(200).json({ favPets });
    } catch (error) {
        console.error("Error in getFavPetsController:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};




