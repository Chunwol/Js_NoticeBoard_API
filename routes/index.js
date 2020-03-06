const express = require('express');
const post = require('./post/post');
const reply = require('./reply/reply');
const user = require('./user/user');
const router = express.Router();

router.post('/post/create', post.post_insert);
router.delete('/post/delete/:id', post.post_delete);
router.put('/post/update/:id', post.post_update);
router.get('/post/show', post.post_show);
router.get('/post/show/:id', post.post_show_id);

router.post('/reply/create/:id', reply.reply_insert);
router.delete('/reply/delete/:id', reply.reply_delete);
router.put('/reply/update/:id', reply.reply_update);
router.get('/reply/show/:id', reply.reply_show);

router.post('/signin', user.register);
router.post('/login', user.login);

module.exports = router;
