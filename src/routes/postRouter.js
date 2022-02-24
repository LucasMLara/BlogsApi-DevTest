const { Router } = require('express');
const {
  createNewPost, getPosts, getSinglePost, updatePost, getPostByString, deletePost,
} = require('../controllers');

const {
  validPost, Auth, checkIfPostExists, checkPostOwnership,
} = require('../middlewares');

const allowUpdate = [Auth, checkIfPostExists, validPost, checkPostOwnership];
const allowDelete = [Auth, checkIfPostExists, checkPostOwnership];

const router = Router();
router.post('/', Auth, validPost, createNewPost);
router.get('/', Auth, getPosts);
router.get('/search', Auth, getPostByString);
router.get('/:id', Auth, checkIfPostExists, getSinglePost);
router.put('/:id', allowUpdate, updatePost);
router.delete('/:id', allowDelete, deletePost);

module.exports = router;
