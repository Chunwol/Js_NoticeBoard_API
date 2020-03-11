const User = require('../../database').user;

exports.register = async (req, res) => {
  const { id, password, name } = req.body;
  const user = await User.create({
    id,
    password,
    name
  }).catch(err => {
    res.status(500).json({ success: false });
  });

  if (user) {
    res.status(200).json({
      success: true,
      message: 'register success'
     });
  } else{
    res.status(412).json({ success: false });
  }
};