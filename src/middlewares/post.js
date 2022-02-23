const { StatusCodes: { BAD_REQUEST, NOT_FOUND } } = require('http-status-codes');
const { postSchema } = require('../validations/schema');
const { Post } = require('../models');

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

module.exports = {
  validPost,
  checkIfPostExists,
};
