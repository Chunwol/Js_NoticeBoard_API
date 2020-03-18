const express = require('express');

const delete_board = require('./board/delete').delete_board;
const get_board = require('./board/get').get_board;
const patch_board = require('./board/patch').patch_board;
const post_board = require('./board/post').post_board;

const delete_comment = require('./boardComment/delete').delete_comment;
const patch_comment = require('./boardComment/patch').patch_comment;
const post_comment = require('./boardComment/post').post_comment;

const register = require('./user/register').register;
const login = require('./user/login').login;
const router = express.Router();

router.post('/board', post_board);
router.delete('/board/:pk', delete_board);
router.patch('/board/:pk', patch_board);
router.get('/board', get_board);
router.get('/board/:pk', get_board);

router.post('/comment/:pk', post_comment);
router.delete('/comment/:pk', delete_comment);
router.patch('/comment/:pk', patch_comment);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
