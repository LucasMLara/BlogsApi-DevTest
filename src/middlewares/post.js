const { StatusCodes: { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } } = require('http-status-codes');
const { postSchema } = require('../validations/schema');
const { Post } = require('../models');
const { getASinglePost } = require('../services/postService');

const validPost = async (req, _res, next) => {
  const { title, content } = req.body;
  const { error } = postSchema.validate({ title, content });
  if (error) return next({ statusCode: BAD_REQUEST, message: error.message });
  return next();
};

const checkIfPostExists = async (req, _res, next) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) {
    return next({ statusCode: NOT_FOUND, message: 'Post não existe' });
  }
  return next();
};

const checkPostOwnership = async (req, _res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user.data;
  const verifying = await getASinglePost(id);
  const checkUserId = verifying.dataValues.user.dataValues.id;
  if (userId !== checkUserId) {
    return next({ statusCode: UNAUTHORIZED, message: 'Usuário não autorizado' });
  }
  return next();
};

module.exports = {
  validPost,
  checkIfPostExists,
  checkPostOwnership,
};
