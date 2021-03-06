const jwt = require('jsonwebtoken');
const Board = require('../../database').board;
require('dotenv').config();
const env = process.env;
exports.post_board = (req, res) => {
  const { title, content } = req.body;
  const { token } = req.headers;
  if(title && content && token){
    jwt.verify(token, env.TOKEN_SECRET, async (err, decoded) => {
      if (err == null) {
        const { pk : user_pk } = decoded;
        const board = await Board.create({
          user_pk,
          title,
          content
        }).catch(err => {
          res.status(500).json({ success: false });
        });
        const { pk : board_pk } = board;
        res.status(200).json({ success: true, pk : board_pk });
      } else{
        res.status(412).json({ success: false });
      }
    });
  } else{
    res.status(412).json({success: false});
  }
};
