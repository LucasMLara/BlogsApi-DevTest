const { Router } = require('express');
const { createNewPost, getPosts, getSinglePost } = require('../controllers');

const { validPost, Auth, checkIfPostExists } = require('../middlewares');

const router = Router();

router.post('/', Auth, validPost, createNewPost);
router.get('/', Auth, getPosts);
router.get('/:id', Auth, checkIfPostExists, getSinglePost);

module.exports = router;
