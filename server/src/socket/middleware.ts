import jwt from "jsonwebtoken"

import { env } from "../config/env.js"

import { JwtPayload } from "../modules/auth/validator.js"

import { AuthenticatedSocket } from "./types.js"
import logger from "../utils/logger.js"

export function socketAuthMiddleware(
  socket: AuthenticatedSocket,
  next: (err?: Error) => void
) {
  try {
    const token = socket.handshake.auth.token

    if (!token) {
      return next(new Error("Unauthorized"))
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    logger.info(" SOCKET TOKEN RECEIVED:", !!token)
    logger.info(" DECODED USER:", decoded.userId)
    socket.userId = decoded.userId

    next()
  } catch {
    next(new Error("Unauthorized"))
  }
}
