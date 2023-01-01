export default function authorization(request, response, next) {
  if (request.headers.authorization !== "1234") {
    response.status(401);
    response.end();
    return;
  }
  next();
}
