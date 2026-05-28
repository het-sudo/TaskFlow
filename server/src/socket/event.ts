import { Notification } from "@prisma/client"
import { getIO } from "./index.js"
import logger from "../utils/logger.js"

export function emitNotification(userId: string, notification: Notification) {
  try {
    const io = getIO()

    logger.info("EMITTING TO ROOM:", `user:${userId}`)

    logger.info("NOTIFICATION PAYLOAD:", notification)

    io.to(`user:${userId}`).emit("notification:new", notification)

    logger.info("EMIT DONE")
  } catch (err) {
    logger.info("Socket emit failed:", err)
  }
}
