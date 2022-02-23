const { Router } = require('express');
const { createNewPost, getPosts } = require('../controllers');

const { validPost, Auth } = require('../middlewares');

const router = Router();

router.post('/', Auth, validPost, createNewPost);
router.get('/', Auth, getPosts);

module.exports = router;
