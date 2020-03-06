const jwt = require('jsonwebtoken');
const Send = require('../../models');
const sequelize = require("sequelize");
const SECRET = 'Chunwol';
const Op = sequelize.Op;

exports.post_insert = (req, res) => {
  const { token, title, content } = req.body;
  jwt.verify(token, SECRET, (err,decoded) => {
    if(err == null){
      const {userid,name} = decoded;
      Send.post.create({
        userid: userid,
        writer: name,
        title: title,
        content: content
      })
      .then( result => {
        const {id} = result.dataValues;
        res.status(200).json({"success": true, "postid":id });
      })
      .catch( err => {
        res.status(200).json({"success": false });
      })
    }else{
      res.status(200).json({"success": false });
  }})
}

exports.post_delete = (req, res) => {
  const { token } = req.body;
  const {id} = req.params;
  jwt.verify(token, SECRET, (err,decoded) => {
    if(err == null){
      Send.post.findOne({
          where: {id: id}
      })
      .then( result => {
        const {userid} = result;
        if(decoded.userid == userid){
          Send.post.destroy({
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
      }
    })
      .catch( err => {
        res.status(200).json({"success": false });
      });
    }else{
      res.status(200).json({"success": false });
    }
  })
}

exports.post_update = (req, res) => {
  const { title, content, token } = req.body;
  const {id} = req.params;
  jwt.verify(token, SECRET, (err,decoded) => {
    if(err == null){
      Send.post.findOne({
        where: {id: id}
      })
      .then( result => {
        const {userid} = result;
        if(decoded.userid == userid){
          Send.post.update({
            title: title,
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

exports.post_show = (req, res) => {
    Send.post.findAll()
    .then( data => {
        res.status(200).json({"success": true , data});
    })
    .catch( err => {
        res.status(200).json({"success": false });
    })
}

exports.post_show_id = (req, res) => {
  const {id} = req.params;
  console.log(id);
  Send.post.findOne({
    where: {id: id}
  })
  .then( data => {
    if(data = null){
      res.status(200).json({"success": true , data});
    }else{
      res.status(200).json({"success": false });
    }
  })
  .catch( err => {
    res.status(200).json({"success": false });
  })
}