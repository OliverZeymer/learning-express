export default function authorization(request, response, next) {
  console.log(request)
  if (request.headers.authorization !== "1234") {
    response.status(401)
    response.end()
    return
  }
  next()
}
