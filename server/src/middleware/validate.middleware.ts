import { Request, Response, NextFunction } from "express"
import { ZodSchema, ZodError } from "zod"
import { StatusCodes } from "http-status-codes"
import logger from "../utils/logger.js"

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        logger.error(" validation error in middleware", {
          errors: error.issues,
          body: req.body,
        })
        const formattedErrors = error.flatten().fieldErrors

        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: error.issues[0]?.message,
          errors: formattedErrors,
        })
        return
      }

      //   logger.error("unknown error occured", err)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
      })
    }
  }
