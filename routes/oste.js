import authorization from "../middlewares/auth.js"
export default function oste(app) {
  app.get("/oste", authorization, function (request, response) {
    response.json([
      {
        id: 1,
        name: "Gouda",
      },
      { id: 2, name: "Feta" },
    ])
    response.end()
  })
}
