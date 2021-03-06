const jwt = require('jsonwebtoken');
const Comment = require('../../database').comment;
require('dotenv').config();
const env = process.env;

exports.post_comment = (req, res) => {
    const { pk : board_pk } = req.params;
    const { token } = req.headers;
    const { content } = req.body;
    if(content && token){
        jwt.verify(token, env.TOKEN_SECRET, async (err, decoded) => {
            if (err == null) {
                const { pk : user_pk } = decoded;
                const comment = await Comment.create({
                    board_pk,
                    user_pk,
                    content
                })
                .catch(err => {
                    res.status(500).json({ success: false });
                });
    
                if(comment){
                    res.status(200).json({ success: true });
                }else {
                    res.status(412).json({ success: false });
                }
            }else {
                res.status(412).json({ success: false });
            }
        });
    } else{
        res.status(412).json({success: false});
    }
};