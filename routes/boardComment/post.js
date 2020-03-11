const jwt = require('jsonwebtoken');
const Comment = require('../../database').comment;
require('dotenv').config();
const env = process.env;

exports.post_comment = (req, res) => {
    const { pk : post_pk } = req.params;
    const { token } = req.headers;
    const { content } = req.body;
    jwt.verify(token, env.TOKEN_SECRET, async (err, decoded) => {
        if (err == null) {
            const { user_pk } = decoded.pk;
            const board = await Comment.create({
                post_pk,
                user_pk,
                content
            })
            .catch(err => {
                res.status(500).json({ success: false });
            });

            if(board){
                res.status(200).json({ success: true });
            }else{
                res.status(412).json({ success: false });
            }
        } else {
            res.status(412).json({ success: false });
        }
    });
};