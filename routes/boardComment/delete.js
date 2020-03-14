const jwt = require('jsonwebtoken');
const Comment = require('../../database').comment;
require('dotenv').config();
const env = process.env;

exports.delete_comment = (req, res) => {
    const { token } = req.headers;
    const { pk } = req.params;
    jwt.verify(token, env.TOKEN_SECRET, async (err, decoded) => {
    if (err == null) {
        const comment = await Comment.findOne({
          where: { pk }
        })
        .catch(err => {
          res.status(500).json({ success: false });
        });
        const { user_pk } = comment;
        const { pk : decoded_pk } = decoded;
        if (decoded_pk == user_pk) {
            await Comment.destroy({
                where: { pk }
            })
            .catch(err => {
                res.status(500).json({ success: false });
            });
            res.status(200).json({ success: true });
        } else {
            res.status(412).json({ success: false });
        }
    } else {
      res.status(412).json({ success: false });
    }
  });
};