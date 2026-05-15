class ApiError extends Error {
  statusCode: number
  success: boolean

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.success = false
  }
}

export default ApiError

// res.status(StatusCodes.OK).send(ReasonPhrases.OK); // 200 OK
