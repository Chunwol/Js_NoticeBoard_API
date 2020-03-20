const jwt = require('jsonwebtoken');
const Board = require('../../database').board;
require('dotenv').config();
const env = process.env;

exports.delete_board = (req, res) => {
  const { token } = req.headers;
  const { pk } = req.params;
  if(token){
    jwt.verify(token, env.TOKEN_SECRET, async (err, decoded) => {
      if (err == null) {
          const board = await Board.findOne({
            where: { pk }
          }).catch(err => {
              res.status(500).json({ success: false });
          });
          if(board){
            const { user_pk } = board;
            const { pk : decoded_pk } = decoded;
            if (decoded_pk == user_pk) {
                await Board.destroy({
                    where: { pk }
                })
                .catch(err => {
                    res.status(500).json({ success: false });
                });
                res.status(200).json({ success: true });
            } else{
                res.status(412).json({ success: false });
            }
          }
      } else{
        res.status(412).json({ success: false });
      }
    });
  } else{
    res.status(412).json({success: false});
  }
};