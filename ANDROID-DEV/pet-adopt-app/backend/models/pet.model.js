import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['dog', 'cat', 'rabbit', 'bird', 'reptile', 'fish', 'horse', 'cow', 'goat', 'pig', 'chicken', 'hedgehog', 'sugar glider', 'tarantula', 'other']
    },
    breed: {
        type: String,
    },
    age: {
        type: Number,
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large', 'extra-large']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'unknown']
    },
    color: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    adoptionStatus: {
        type: Boolean,
        default: false,
    },
    adoptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;