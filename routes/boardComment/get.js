const Comment = require('../../database').comment;
const sequelize = require('sequelize');
const Op = sequelize.Op;

exports.get_comment = async (req, res) => {
    const { pk } = req.params;
    const comment = await Comment.findAll({
      where: {
        post_pk: {
          [Op.like]: pk
        }
      }
    })
    .catch(err => {
      res.status(500).json({ success: false });
    });
    res.status(200).json({ success: true, comment });
};
