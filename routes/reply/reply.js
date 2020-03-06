const jwt = require('jsonwebtoken');
const Send = require('../../models');
const sequelize = require("sequelize");
const SECRET = 'Chunwol';
const Op = sequelize.Op;

exports.reply_insert = (req, res) => {
  const {id} = req.params;
  const { token, content } = req.body;
  jwt.verify(token, SECRET, (err,decoded) => {
    if(err == null){
      const {userid,name} = decoded;
      Send.reply.create({
        postid: id,
        userid: userid,
        writer: name,
        content: content
      })
      .then( result => {
        res.status(200).json({"success": true });
      })
      .catch( err => {
        res.status(200).json({"success": false });
      })
    }else{
      res.status(200).json({"success": false });
  }})
}

exports.reply_delete = (req, res) => {
  const { token } = req.body;
  const {id} = req.params;
  jwt.verify(token, SECRET, (err,decoded) => {
    if(err == null){
      Send.reply.findOne({
        where: {id: id}
      })
      .then( result => {
        const {userid} = result;
          if(decoded.userid == userid){
            Send.reply.destroy({
              where: {id: id}
            })
            .then( result => {
              res.status(200).json({"success": true });
            })
            .catch( err => {
              res.status(200).json({"success": false,err });
            });
        }else{
          res.status(200).json({"success": false });
      }})
      .catch( err => {
        res.status(200).json({"success": false,err });
      });
  }else{
    res.status(200).json({"success": false });
  }})
}

exports.reply_update = (req, res) => {
  const { token, content } = req.body;
  const {id} = req.params;
  jwt.verify(token, SECRET, (err,decoded) => {
    if(decoded){
      Send.reply.findOne({
        where: {id: id}
      })
      .then( result => {
        const {userid} = result;
        if(decoded.userid == userid){
          Send.reply.update({
            content: content
          },{
            where: {id: id}
          })
          .then( result => {
            res.status(200).json({"success": true });
          })
          .catch( err => {
            res.status(200).json({"success": false });
          });
      }else{
        res.status(200).json({"success": false });
      }})
      .catch( err => {
        res.status(200).json({"success": false });
      });
    }else{
      res.status(200).json({"success": false });
    }})
}

exports.reply_show = (req, res) => {
    const {id} = req.params;
    Send.reply.findAll({
      where:{
        postid: {
          [Op.like]: id
        }
      }
    })
    .then( data => {
        res.status(200).json({"success": true , data});
    })
    .catch( err => {
        res.status(200).json({"success": false });
    })
}