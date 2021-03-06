const {
  StatusCodes: {
    CREATED, INTERNAL_SERVER_ERROR, OK, NO_CONTENT,
  },
} = require('http-status-codes');
const {
  create, getAllPosts, getASinglePost, updateASinglePost, getSearchTerm, remove,
} = require('../services/postService');

const createNewPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user.data;

    const userId = id;
    const rawNewPost = await create({ title, content, userId });
    const {
      id: _, updated, published, ...newPost
    } = rawNewPost.dataValues;

    return res.status(CREATED).json(newPost);
  } catch (e) {
    return next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const getPosts = async (_req, res, next) => {
  try {
    const allPosts = await getAllPosts();
    return res.status(OK).json(allPosts);
  } catch (e) {
    return next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singlePost = await getASinglePost(id);
    return res.status(OK).json(singlePost);
  } catch (e) {
    return next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const postUpdate = await updateASinglePost(id, { title, content });
    return res.status(OK).json(postUpdate);
  } catch (e) {
    return next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const getPostByString = async (req, res, next) => {
  try {
    const { q } = req.query;
    const postsSelected = await getSearchTerm(q);
    return res.status(OK).json(postsSelected);
  } catch (e) {
    return next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await remove(id);
    return res.status(NO_CONTENT).send();
  } catch (e) {
    return next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

module.exports = {
  createNewPost,
  getPosts,
  getSinglePost,
  updatePost,
  getPostByString,
  deletePost,
};
