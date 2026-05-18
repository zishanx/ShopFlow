import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email, password: hashedPassword
        })

        res.status(201).json({ message: "User registered sucessfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUser = await User.findOne({ email });

        if (!isUser) {
            return res.status(400).json({ message: "User doesn't exists" })
        }

        if (await bcrypt.compare(password, isUser.password)) {
            const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

            res.status(201).json({
                token: token,
                user: {
                    id: isUser._id,
                    name: isUser.name,
                    email: isUser.email,
                    role: isUser.role
                }
            });
        } else {
            res.status(400).json({ message: "Invalid credential" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}