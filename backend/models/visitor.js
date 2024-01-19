import mongoose from "mongoose";

const visitorSchema = mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        min: 3
    },
    lastName: {
        required: true,
        type: String,
        min: 3
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        min: 5
    },
},
    { timestamps: true },

);

const Visitor = mongoose.model('visitor', visitorSchema);
export default Visitor;