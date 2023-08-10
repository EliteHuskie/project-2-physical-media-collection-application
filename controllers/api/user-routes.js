const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const dbUserData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbUserData) {
      res
        .status(404)
        .json({ message: `No user found with id: ${req.params.id}` });
      return;
    }

    res.status(200).json(dbUserData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT user updates
router.put("/:id", async (req, res) => {
  try {
    const dbUserData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });

    if (!dbUserData) {
      res
        .status(404)
        .json({ message: `No user found with id: ${req.params.id}` });
      return;
    }

    res.status(200).json(dbUserData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(
        "File: user-routes.js ~ line 51 ~ req.session.save ~ req.session.cookie",
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
