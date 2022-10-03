import express from "express";
import { getAll, insert, _delete } from "../service/comments.js";
import auth from "../middleware/authentication.js";
// import { getById, _update } from "../service/freelancer.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  const comments = await getAll();

  if (comments) {
    res.json({ message: comments, status: "success" });
  } else {
    res.json({ message: "an Error occured", status: "danger" });
  }
});

Router.post("/comment", auth, async (req, res) => {
  const id = req.body.FreelancerId;
  if (await insert(req.body)) {
    res.json({ status: "success", message: "Comment was sent" });
  } else {
    res.json({ status: "danger", message: "Error" });
  }
});

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await _delete(id);
    res.json({ status: "success", message: "Comment was deleted" });
  } catch {
    res.json({ status: "danger", message: "Deleting comment unsuccesfull" });
  }
});

export default Router;