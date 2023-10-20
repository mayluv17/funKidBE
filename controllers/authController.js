const userDB = {
  users: require("../model/users.json"),
  setUser: (data) => {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username)
    return res.status(400).json({ message: "username and password required" });

  const foundUser = userDB.users.find((user) => user.username === username);
  if (!foundUser) return res.status(401).json({ message: "user not found" }); //unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWT

    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refrshtokent with user table
    const otherUsers = userDB.users.filter(
      (user) => user.username !== foundUser.username
    );
    //saving the refreshtoken with the current user
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUser([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "username and password mismatch!" });
  }
};

module.exports = { handleLogin };
