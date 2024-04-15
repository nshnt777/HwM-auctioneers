import express from 'express'
import jwt from 'jsonwebtoken';
import {z} from 'zod'
import {UserModel} from '../database/db.js'
import env from 'dotenv'
env.config();
import authMiddleware from '../middlewares/middleware.js'

const userRouter = express.Router();

const JWT_KEY = process.env.JWT_SECRET;

const signupSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string().optional(),
    password: z.string().min(8),
    mobile: z.number({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a number"
    }).int().positive(),
    role: z.string()
});

userRouter.post('/signup', async (req, res)=>{
    const signupBody = req.body;
    try {
        if(!signupSchema.safeParse(signupBody).success){
            return res.status(411).json({
                message: "Incorrect data entered"
            });
        }
    
        const existingUser = await UserModel.find({username: signupBody.username});
        if(existingUser.length > 0){
            return res.status(411).json({
                message: "Email already taken"
            });
        }
        else{
            const user = await UserModel.create(signupBody);
            // userID = user._id

            const token = jwt.sign({userID: user._id}, JWT_KEY);
    
            return res.status(200).json({
                message: "User created successfully",
                token: token
            });
        }
    } catch (error) {
        console.log("Error: ", error.message);

        return res.status(411).json({
            error: "Error while creating user" 
        })
    }
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

userRouter.post('/login', async (req,res)=>{
    const loginBody = req.body;
    try {
        if(!loginSchema.safeParse(loginBody).success){
            return res.status(411).json({
                message: "Incorrect data entered"
            });
        }
    
        const existingUser = await UserModel.findOne({
            username: loginBody.username,
            password: loginBody.password
        });
        if(!existingUser){
            return res.status(411).json({
                message: "User not found"
            })
        }
        else{
            const token = jwt.sign({userID: existingUser._id}, JWT_KEY);
    
            return res.status(200).json({
                message: "Logged in successfully",
                token: token
            });
        }
    } catch (error) {
        console.log("Error: ", error.message);

        return res.status(411).json({
            message: "Error while loggin in"
        })
    }
});

const updateSchema = z.object({
    password: z.string().min(8).optional() ,
    firstName: z.string().optional(),
    lastName:  z.string().optional(),
    mobile: z.number().optional()
});

userRouter.put("/", authMiddleware, async (req,res)=>{
    const updateBody = req.body;
    const userID = req.userID;

    if(!updateSchema.safeParse(updateBody).success){
        res.status(411).json({
            message: "Invalid data given"
        });
    }

    try {
        const userDataUpdate = await UserModel.updateOne({_id: userID}, updateBody)
        
        if(userDataUpdate.acknowledged){
            return res.status(200).json({
                message: "Updated successfully"
            });
        }
        else{
            return res.status(411).json({
                message: "Could not update user"
            })
        }
    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(411).json({
            message: "Error while updating user"
        })
    }
});

userRouter.get('/me', authMiddleware, async (req, res)=>{
    const userID = req.userID;

    try {
        const yourName = await UserModel.findOne({
            _id: userID
        }, {
            username: 1,
            firstName: 1,
            lastName: 1
        });
    
        return res.status(200).json({
            username: yourName.username,
            firstName: yourName.firstName,
            lastName: yourName.lastName
        });
    } catch (error) {
        console.log("Error fetching name: ", error.message);
        return res.status(404).json({
            message: "User not found"
        });
    }
})

const registerSchema = z.object({
    email: z.string().email() ,
    mobile: z.number().optional()
});

const participants = []

userRouter.post('/participate', (req, res) => {
    const { email, productId } = req.body;

    const existingUser = participants.find((p) => {
        return p.email === email && p.productId === productId
    });
    if (existingUser) {
        console.log("User already registered")
        return res.status(409).json({
            message: 'User already registered for this auction'
        });
    }

    const newParticipant = {
        email: email,
        productId: productId
    };
    participants.push(newParticipant);
    console.log("User registered")
    return res.status(200).json({
        message: 'User registered successfully',
        user: newParticipant
    });
});

export default userRouter;