require("dotenv").config();
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Profile = require("../models/profile");
const { profPop, userSelect } = require("../util/query_helper");
const {
  comparePasswords,
  getJWT,
  hashPassword,
} = require("../util/auth_helper");

const secret = process.env.SECRET;

const router = express.Router();

router.get("/:handle", (req, res) => {
  User.findOne(req.params)
    .then((user) => {
      if (user) {
        Profile.findOne({ user })
          .populate(profPop)
          .then((profile) => res.status(200).json(profile))
          .catch((e) => res.status(404).json(e));
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => res.status(404).json(e));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const found = await User.findOne({ email });

  if (found) {
    const match = await comparePasswords(password, found.password);

    if (match) {
      Profile.findOne({ user: found._id })
        .populate(profPop)
        .then((profile) => {
          const payload = { id: found._id, handle: found.handle };
          jwt.sign(payload, secret, (err, token) => {
            if (token) {
              res.status(201).json({
                token,
                profile,
              });
            } else {
              res.status(500).end();
            }
          });
        })
        .catch((e) => res.status(500).send(e));
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ error: "Invalid email or password" });
  }
});

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileData = {
      profilePhoto: req.body.profilePhoto,
      location: req.body.location,
      occupation: req.body.occupation,
      bio: req.body.bio,
      cuisine: req.body.cuisine,
      favoriteFood: req.body.favoriteFood,
    };

    Profile.findOneAndUpdate({ user: req.user.id }, profileData, {
      new: true,
    })
      .populate(profPop)
      .then((profile) => res.status(200).json(profile))
      .catch((e) => res.status(404).json(e));
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      const user = req.user.id;

      Profile.findOne({ user })
        .populate(profPop)
        .then((populated) => res.status(200).json(populated))
        .catch((e) => res.status(500).json(e));
    } else {
      res.status(401).end();
    }
  }
);

router.post("/", async (req, res) => {
  const formData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    handle: req.body.handle,
    email: req.body.email,
  };

  //req.params.id
  const { password } = req.body;
  const newUser = new User(formData);

  bcrypt.genSalt((err, salt) => {
    if (err) {
      console.log("error is", err);
    }

    bcrypt.hash(password, salt, async (error, hashedPassword) => {
      if (error) {
        console.log("error is", error);
      }
      newUser.password = hashedPassword;

      const savedUser = await newUser.save();
      const newProfile = new Profile({ user: savedUser._id });
      const savedProfile = await newProfile.save();

      Profile.populate(savedProfile, profPop)
        .then((profile) => {
          const payload = { id: savedUser._id, handle: savedUser.handle };
          jwt.sign(payload, secret, (err, token) => {
            if (token) {
              res.status(201).json({
                token,
                profile,
              });
            } else {
              res.status(500).end();
            }
          });
        })
        .catch((e) => res.status(500).send(e));
    });
  });

  // newUser.password = await hashPassword(password);

  // const savedUser = await newUser.save();
  // const newProfile = new Profile({ user: savedUser._id });
  // const savedProfile = await newProfile.save();

  // Profile.populate(savedProfile, profPop)
  //   .then((profile) => {
  //     const token = getJWT(savedUser._id, savedUser.handle);
  //     if (token) {
  //       res.status(201).json({
  //         token,
  //         profile,
  //       });
  //     } else {
  //       res.status(500).end();
  //     }
  //   })
  //   .catch((e) => res.status(500).send(e));
});

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      handle: req.body.handle,
    };

    User.findOneAndUpdate({ _id: req.user.id }, userData, {
      new: true,
      runValidators: true,
      context: "query ",
    })
      .select(userSelect)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((e) => {
        res.status(404).json(e);
      });
  }
);

module.exports = router;
