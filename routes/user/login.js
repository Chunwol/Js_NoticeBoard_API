const jwt = require('jsonwebtoken');
const User = require('../../database').user;
require('dotenv').config();

exports.login = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({
    where: {
      id,
      password
    }
  });

  if (user) {
    const token = jwt.sign({pk : user.pk}, process.env.TOKEN_SECRET);
    res.status(200).json({
      success: true,
      user,
      token
    });
  } else{
    res.status(412).json({
      success: false,
      message: 'wrong data'
    })
  }
};