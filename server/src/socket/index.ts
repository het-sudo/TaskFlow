import { Server as HttpServer } from "http"

import { Server } from "socket.io"

import { socketAuthMiddleware } from "./middleware.js"

import { AuthenticatedSocket } from "./types.js"
import logger from "../utils/logger.js"

let io: Server

export function initializeSocket(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.ORIGIN,
      credentials: true,
    },
  })

  io.use(socketAuthMiddleware)

  io.on("connection", (socket: AuthenticatedSocket) => {
    logger.info("SOCKET CONNECTED:", socket.userId)
    logger.info("SOCKET ID:", socket.id)
    const room = `user:${socket.userId}`

    socket.join(room)
    logger.info("JOINED ROOM:", room)

    logger.info("ROOMS FOR SOCKET:", Array.from(socket.rooms))
    logger.info(
      " ACTIVE ROOMS SNAPSHOT:",
      Array.from(io.sockets.adapter.rooms.entries())
    )
    logger.info(`Socket connected: ${socket.userId}`)

    socket.on("disconnect", (reason) => {
      logger.info(`Socket disconnected: ${socket.userId}`)
      logger.info(" DISCONNECTED:", socket.userId)
      logger.info("REASON:", reason)
    })
  })

  return io
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized")
  }

  return io
}
