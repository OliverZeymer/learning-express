import express from "express"
import oste from "./routes/oste.js"
const app = express()
const port = 3000

app.use(express.static("./public"))
oste(app)
app.get("/hej/:navn", function (request, response, next) {
  response.setHeader("content-type", "text/html")
  response.send("<link rel='stylesheet' href='/style.css'>" + "<h1>Hej " + request.params.navn + "</h1>")
  response.end()
})

app.listen(port, function () {
  console.log("Server is running on port 3000")
})
