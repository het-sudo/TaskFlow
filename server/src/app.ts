import express, { NextFunction, Request, Response, type Express } from "express"
import cors from "cors"
import errorHandler from "./middleware/error.middleware.js"
import cookieParser from "cookie-parser"
import rootRouter from "./routes/index.js"

const app: Express = express()

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:4173/",
    credentials: true,
  })
)
app.use(express.json())
app.get("/", (req, res) => {
  res.json({ ok: true })
})
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).json({ message: err.message })
})
app.use(cookieParser())
app.use("/api/v1", rootRouter)
app.use(errorHandler)

export default app
