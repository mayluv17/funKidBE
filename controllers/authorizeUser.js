const User = require('../model/User');

const handleAuthorizeUser = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role)
    return res.status(400).json({ message: 'user and role should be defined' });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(404).json({ message: 'user not found' });

  if (foundUser.roles.includes(role))
    return res.status(400).json({ message: `user already an ${role}` });
  foundUser.roles = [...foundUser.roles, role];

  const result = await foundUser.save();
  result &&
    res.status(201).json({ message: `${role} Access granted for ${email}` });
};

module.exports = { handleAuthorizeUser };
