import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilepic: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    petsAdded: [
        {
            pet: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Pet',
            },
            adopted: {
                type: Boolean,
                default: false
            }
        }
    ],
    favPets: [
        {
            petId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Pet',
            }
        }
    ]
});

const User = mongoose.model("User", userSchema);

export default User;
