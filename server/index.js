import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, ".env") })


const app = express()
const PORT = process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.json({message : "Examforge ai Server is running"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})