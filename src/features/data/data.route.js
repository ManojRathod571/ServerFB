const express = require("express");
const User = require("../Auth/auth.model");
const Data = require("./data.model");

const app = express.Router();

const authMiddleWare = async (req, res, next) => {
  let token = req.headers.token;
  if (!token) {
    return res.send("missing token");
  }
  const [email, id, password] = token.split(":");
  try {
    let user = await User.findOne({ email });
    if (user) {
      if (password === user.password) {
        req.userId = user.id;
        next();
      } else {
        res.status(400).send("Auth Failure");
      }
    } else {
      res.status(400).send(`${email} not found`);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
};

app.get("/:id", async (req, res) => {
  let data = await Data.find({ [user._id]: req.params.id }).populate(["user"]);
  res.send(data);
});

app.get("", async (req, res) => {
  const { page, limit } = req.query;
  let data = await Data.find()
    .populate(["user"])
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit);
  res.send(data);
});

app.post("", authMiddleWare, async (req, res) => {
  try {
    let post = await Data.create({
      ...req.body,
      user: req.userId,
    });
    res.send(post);
  } catch (e) {
    res.send(e.message);
  }
});

app.patch("/:id", async (req, res) => {
  try {
    if (req.body.type === "like") {
      let user = await Data.findOne({
        _id: req.params.id,
        "likes.user_name": req.body.user_name,
      });
      if (user) {
        let temp = await Data.findByIdAndUpdate(req.params.id, {
          $pull: {
            likes: {
              user_name: req.body.user_name,
              user_image: req.body.user_image,
            },
          },
        });
        res.send(temp);
      } else {
        let temp = await Data.findByIdAndUpdate(req.params.id, {
          $push: {
            likes: {
              user_name: req.body.user_name,
              user_image: req.body.user_image,
            },
          },
        });
        res.send(temp);
      }
    } else if (req.body.type == "comment") {
      let temp = await Data.findByIdAndUpdate(req.params.id, {
        $push: {
          comments: {
            user_name: req.body.user_name,
            user_image: req.body.user_image,
            title: req.body.title,
          },
        },
      });
      res.send(temp);
    }
  } catch (e) {
    res.send(e.message);
  }
});

app.delete("/:id", async (req, res) => {
  let [email, idk, password] = req.headers.token.split(":");
  try {
    let temp = await Data.findOne({
      _id: req.params.id,
      user: idk,
    });
    if (temp) {
      await Data.findOneAndDelete({
        _id: req.params.id,
        user: idk,
      });
      res.send("Deleted");
    } else {
      res.send("Not Deleted");
    }
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = app;
