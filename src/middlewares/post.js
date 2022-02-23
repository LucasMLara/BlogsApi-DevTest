const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes');
const { postSchema } = require('../validations/schema');

const validPost = async (req, _res, next) => {
  const { title, content } = req.body;
  const { error } = postSchema.validate({ title, content });
  if (error) return next({ statusCode: BAD_REQUEST, message: error.message });
  return next();
};

module.exports = {
  validPost,
};
