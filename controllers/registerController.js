const userDB = {
  users: require("../model/users.json"),
  setUser: (data) => {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username)
    return res.status(400).json({ message: "username and password required" });

  // check for duplicate username
  const duplicate = userDB.users.find((person) => person.username === username);
  if (duplicate)
    return res
      .status(409)
      .json({ message: "duplicate username! chose another one" }); //conflicting error code
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // store the new this.user
    const newUser = { username: username, password: hashedPassword };
    userDB.setUser([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify([...userDB.users, newUser])
    );
    console.log(userDB.users);
    res.status(201).json({ message: `user ${username} created succesfully` }); //new user added
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;
