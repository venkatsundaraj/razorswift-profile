export class ApiError extends Error {
  constructor(message = "Can't retrieve the data you are looking for") {
    super(message)
    this.name = 'ApiError'
  }
}
