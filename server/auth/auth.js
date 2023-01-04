import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.jwtSecret;

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password is less than 6 characters" });
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      email,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60; // 3 hours in seconds
        const token = jwt.sign({ id: user._id, username }, jwtSecret, {
          expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3 hours in ms
        });
        res
          .status(201)
          .json({ message: `User successfully created`, user: user._id });
      })
      .catch((error) =>
        res.status(400).json({
          message: `User not successfully created`,
          error: error.message,
        })
      );
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: `Username or Password not present`,
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: `Login not successful`,
        error: `User not found`,
      });
    }
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const maxAge = 3 * 60 * 60; // 3 hours in seconds
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge,
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3 hours in ms
        });
        res.status(201).json({
          message: `Login successful`,
          user: user._id,
        });
      } else {
        res.status(400).json({ message: `Login not successful` });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: `An error occurred`,
      error: error.message,
    });
  }
};

const updateUser = async (req, res, next) => {
  const { role, id } = req.body;
  if (role && id) {
    if (role === "admin") {
      await User.findById(id)
        .then((user) => {
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              if (err) {
                res
                  .status(400)
                  .json({ message: "And error occurred", error: err.message });
                process.exit(1);
              }
              res.status(201).json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an admin" });
          }
        })
        .catch((err) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: err.message });
        });
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.remove())
    .then((user) =>
      res.status(201).json({ message: `User successfully deleted`, user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: `An error occurred`, error: error.message })
    );
};

export { register, login, updateUser, deleteUser };
