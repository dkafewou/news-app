export default class DatabaseError extends Error {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, DatabaseError)
  }
}
