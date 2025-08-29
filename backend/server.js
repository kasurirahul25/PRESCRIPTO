import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectcloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminrouter.js"
import { GoogleGenerativeAI } from "@google/generative-ai"

// app config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectcloudinary()

// middleware
app.use(express.json())
app.use(cors())

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Check if API key is loaded
console.log("🔑 GEMINI KEY:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "❌ Not Found")

// Chatbot API endpoint
// Chatbot API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body
    if (!question) {
      return res.status(400).json({ answer: "No question provided" })
    }

    // ✅ Use correct Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(question)
    const response = await result.response
    const text = response.text()

    res.json({ answer: text })
  } catch (error) {
    console.error("❌ Gemini API Error:", error)
    res.status(500).json({ answer: "Error while communicating with AI" })
  }
})

// api end point
app.use("/api/admin", adminRouter)

app.get("/", (req, res) => {
  res.send("Api is working and fine 🚀")
})

app.listen(port, () =>
  console.log(`🚀 Server is started at http://localhost:${port}`)
)
