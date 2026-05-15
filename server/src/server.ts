import "dotenv/config"
import app from "./app.js"
import prisma from "./lib/prisma.js"
import logger from "./utils/logger.js"

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await prisma.$connect()
    logger.info(" Database connected")

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  } catch (error) {
    logger.error("Error starting server:", error)
    process.exit(1)
  }
}

startServer()
