// import upload from "../../middlewares/upload.js";
import getData from "./getData.js";
import authorization from "../../middlewares/auth.js";
import createData from "./createData.js";
import deleteData from "./deleteData.js";
import editData from "./editData.js";
export default function database(app) {
  app
    .route("/api/v1/:resource/:id?")
    .all(authorization)
    .get(getData)
    .post(createData)
    .delete(deleteData)
    .patch(editData);
}

// .post(upload.single("img"), createData)
