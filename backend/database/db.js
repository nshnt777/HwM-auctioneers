import mongoose from 'mongoose'
import env from 'dotenv';
env.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster1.6p0fwmb.mongodb.net/`)
.then((result) => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.log("Error: ", err.message);
});

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 8},
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    mobile: {type: Number, required: true},
    role: {type: Number, required: true} 
});

const UserModel = mongoose.model("Users", userSchema);

// userID type: mongoose.Schema.Types.ObjectId

export {UserModel};