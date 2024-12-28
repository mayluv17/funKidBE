const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const userinfo = {
      username: foundUser.username,
      roles: foundUser.roles,
      email: foundUser.email,
      userId: foundUser._id,
      points: foundUser.points,
    };

    const accessToken = jwt.sign(
      {
        UserInfo: userinfo,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2d' }
    );

    const refreshToken = jwt.sign(userinfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ roles: foundUser.roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
