const { Router } = require('express');
const { createNewPost } = require('../controllers');

const { validPost, Auth } = require('../middlewares');

const router = Router();

router.post('/', Auth, validPost, createNewPost);

module.exports = router;
