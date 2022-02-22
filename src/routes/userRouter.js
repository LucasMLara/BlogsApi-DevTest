const { Router } = require('express');
const {
  createNewUser, getEveryone, getById, removeMySelf,
} = require('../controllers');
const { validUser, Auth, checkIfUserExists } = require('../middlewares');

const router = Router();

router.post('/', validUser, createNewUser);
router.get('/', Auth, getEveryone);
router.get('/:id', Auth, checkIfUserExists, getById);
router.delete('/me', Auth, removeMySelf);

module.exports = router;
