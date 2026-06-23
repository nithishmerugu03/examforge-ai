import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import connectDb from "./utils/connectDb.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, ".env") })


const app = express()

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"]
    }
))
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.json({message : "Examforge ai Server is running"})
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDb()
})