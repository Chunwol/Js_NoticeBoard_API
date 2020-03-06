const jwt = require('jsonwebtoken');
const Send = require('../../models');
const sequelize = require("sequelize");
const SECRET = 'Chunwol';

exports.register = (req, res) => {
    const { userid, userpw, username } = req.body;
    Send.user.create({
      userid: userid,
      password: userpw,
      name: username
    })
    .then( result => {
        res.status(200).json({"success": true });
    })
    .catch( err => {
        res.status(200).json({"success": false });
    })
}

exports.login = (req, res) => {
    const { userid, userpw } = req.body;
    Send.user.findAndCountAll({
        where: {userid: userid, password: userpw}
    })
    .then(result => {
        const {id, name} = result.rows[0].dataValues;
        if(result.count === 1) {
            const token = jwt.sign({
                userid : id,
                name : name
            }, SECRET, {
                algorithm: 'HS256',
                expiresIn: '24h'
            })
            res.status(200).json({"success": true, token: token });
        } else {
            res.status(200).json({"success": false });
        }
    })
    .catch(err => {
        res.status(200).json({"success": false });
    })
}
