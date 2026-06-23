import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
    try{
        const { name, email} = req.body;
        let user = await UserModel.findOne({ email });
        if(!user){
            user = await UserModel.create({ name, email });
        }
        let token = await getToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json(user)
    }catch(error){
        console.error("Google Auth error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }   
}

export const logOut = async (req, res) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        return res.status(200).json({message: "Logged out successfully"})
    }catch(error){
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
