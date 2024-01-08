const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password, !email)
    return res
      .status(400)
      .json({response: 0, message: "Username and password are required." });

  // check for duplicate usernames in the db
  const emailDuplicate = await User.findOne({ email: email }).exec();
  const usernameDuplicate = await User.findOne({ username: username }).exec();
  if (emailDuplicate) return res.status(400).json({message: "The email already exist"}) // res.sendStatus(409); //Conflict
  if (usernameDuplicate) return res.status(400).json({message: "The username already exist"}) // res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      username: username,
      password: hashedPwd,
      email: email
    });

    console.log(result);
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
