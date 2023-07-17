const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./src/models/User");
const Logger = require("./src/utils/Logger");
const { MONGO_URI, PORT } = require("./src/entities/constants");

const app = express();
const logger = new Logger();

// ============================================================
// ===================Express Middlewares======================

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(logger.logRequest);
app.use(logger.logError);

// ============================================================
// =====================Mongo DB logic=========================

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// ============================================================
// =====================Passport logic=========================

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ username: email });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserialise", id, done);
  const data = await User.findById(id);
  console.log(data);
  done(null, data);
});

app.use(passport.initialize());
app.use(passport.session());

// ============================================================
// ====================Helper Functions========================

// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

// function isNotAuthenticated(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

// ============================================================
// ======================Router Logic==========================

app.get("/blog", (req, res) => {
  res.sendFile(`${__dirname}/public/templates/blog.html`);
});

app.get("/about", (req, res) => {
  res.sendFile(`${__dirname}/public/templates/about.html`);
});

app.get("/upload", (req, res) => {
  res.sendFile(`${__dirname}/public/templates/upload.html`);
});

app.get("/contact", (req, res) => {
  res.sendFile(`${__dirname}/public/templates/contact.html`);
});

app.get("/get-started", (req, res) => {
  res.sendFile(`${__dirname}/public/templates/get-started.html`);
});

app.get("/single-blog", (req, res) => {
  res.sendFile(`${__dirname}/public/templates/single-blog.html`);
});

app.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/public/templates/login.html`);
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred before");
    }
    console.log(err, user, info);
    if (!user) {
      // Authentication failed, display error message
      console.error("auth failed");
      return res.status(401).send({ error: info.message });
    }

    req.logIn(user, (logInError) => {
      if (logInError) {
        console.error(logInError);
        return res.status(500).send("logInError: An error occurred after");
      }

      // Authentication successful, redirect to the profile page
      res.redirect("/upload");
    });
  })(req, res, next);
});

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send("Username already taken");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    const user = await newUser.save();
    console.log(user);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/templates/index.html`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
