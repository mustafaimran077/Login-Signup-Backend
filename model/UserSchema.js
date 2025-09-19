import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});


export const UserModule = mongoose.model("User", userSchema);
