import connectToDb from "../db/connectToDb.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
export const signupUser = async (req, res) => {
    console.log("req reached");
    console.log(req.body)
    try {
        await connectToDb();
        const { fullName, userName, email, gender, password } = req.body;
        if (!fullName || !email || !gender || !password) {
            return res.status(401).json({ error: "All fields are required" });
        }

        const user = User.find({ username: userName });
        if ((await user).length > 0) {
            return res.status(400).json({ error: "username already exists" });
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const gitlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName: fullName,
            userName: userName,
            email: email,
            password: hashedPassword,
            gender: gender,
            profilepic: gender == "male" ? boyProfilepic : gitlProfilepic
        });


        if (newUser) {
            await newUser.save();
            return res.status(201).json({
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                profilePic: newUser.profilepic

            })
        } else {
            res.status(400).json({ error: "Invalid user Data" });
        }
    } catch (error) {
        console.log("Error in signupUser controller : ", error.message);
    }
}



export const loginUser = async (req, res) => {
    try {
        await connectToDb();
        console.log("request reached at login");
        console.log(req.body)

        const { userName, password } = req.body;

        const user = await User.findOne({ userName: userName });

        if (!user) {
            return res.status(401).json({
                message: "user not found"
            });
        }
        const isCorrectPassword = bcrypt.compare(user.password, password);

        if (isCorrectPassword) {
            return res.status(201).json({
                id: user._id,
                userName: user.userName,
                email: user.email,
                profilePic: user.profilepic
            })
        }
        return res.status(401).json({
            error: "Password does not matched"
        })



    } catch (error) {
        console.log("Error in loginUser controller : ", error.message)
    }
}