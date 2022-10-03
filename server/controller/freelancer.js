import express from "express";
import {
  getAll,
  getById,
  insert,
  _delete,
  _update,
  getByUserId,
} from "../service/freelancer.js";
import Joi from "joi";
import validator from "../middleware/validator.js";
import multer from "multer";
import { access, mkdir } from "fs/promises";
import { Op } from "sequelize";
import auth from "../middleware/authentication.js";
import { getAll as crowdfunderComments } from "../service/comments.js";

const Router = express.Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const path = "./uploads";
    try {
      await access(path);
    } catch {
      await mkdir(path);
    }
    cb(null, path);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".");
    callback(null, Date.now() + "." + ext[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    //Atliekamas failu formato tikrinimas
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

Router.get("/comments/:id", async (req, res) => {
  const id = req.params.id;
  let entries = await getById(id);
  if (entries) {
    const comments = await crowdfunderComments(entries.id);
    res.json({ status: "success", message: comments });
  } else {
    res.json({ status: "danger", message: "Nepavyko surasti profilio" });
  }
});

Router.get("/", async (req, res) => {
  const freelance = await getAll();

  if (freelance) {
    res.json({ message: freelance, status: "success" });
  } else {
    res.json({ message: "an Error has occured", status: "danger" });
  }
});


Router.get("/approved", async (req, res) => {
  const freelance = await getAll({
    where: {
      Aproved: 1
    }
  });

  if (freelance) {

    res.json({ message: freelance, status: "success" });
  } else {
    res.json({ message: "an Error has occured", status: "danger" });
  }
});


Router.post("/approve/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let freelance = await getById(id);

  freelance.Aproved = 1;

  freelance.save();


    res.json({ status: "success" });
});


Router.get('/filter/service/:service', async(req,res)=>{
  const service = req.params.service
  const like_string = '%' + service + '%'
  const profiles = await getAll({
      where: {
          service:
          {
              [Op.like]: like_string
          }
      }
  })
  if(profiles){
      res.json({message: profiles, status: 'success'})
  }else{
      res.json({message: 'Įvyko klaida', status: 'danger'})
  }
})

Router.get("/user/:UserId", async (req, res) => {
  const UserId = req.params.UserId;
  let fundraiser = await getByUserId(UserId);

  if (fundraiser) {
    res.json({ message: fundraiser, status: "success" });
  } else {
    res.json({ message: "An error has occured", status: "danger" });
  }
});


Router.post("/create", auth, upload.single("fl_image"), async (req, res) => {
  console.log(req.file);
  req.body.fl_image = req.file.filename;
  if (await insert(req.body)) {
    res.json({ status: "success", message: "Freelancer offer was created" });
  } else {
    res.json({ status: "danger", message: "Error" });
  }
});


Router.get("/single/:id", async (req, res) => {
  const id = req.params.id;
  let entries = await getById(id);
  console.log(entries)
  if (entries) {
    res.json({ status: "success", message: entries });
  } else {
    res.json({ status: "danger", message: "Unable to fetch Information" });
  }
});


Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    await _delete(id);
    res.json({ status: "success", message: "Crowdfunder was deleted" });
  } catch {
    res.json({ status: "danger", message: "Crowdfunder was not deleted" });
  }
});

Router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const freelance = req.body;

  try {
    await _update(id, freelance);
    res.json({ status: "success", message: "Book was updated" });
  } catch {
    res.json({ status: "danger", message: "Book was not renewed" });
  }
});

export default Router;
