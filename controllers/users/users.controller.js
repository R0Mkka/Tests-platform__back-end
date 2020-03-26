const express = require('express');
const router = express.Router();

const usersService = require('../../services/users/users.service');

const handleResponseError = require('../../helpers/handle-response-error');

// GET USER LIST
router.get('/', async (req, res) => {
  try {
    const users = await usersService.getUsers();

    res.status(200).send(users);
  } catch (error) {
    handleResponseError(res, error);
  }
});

// GET CURRENT USER DATA
router.get('/current', (req, res) => {
  const secureUser = usersService.getSecureUserData(req.user);

  res.send(secureUser);
});

// GET USER BY ID
router.get('/:id', async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.id);

    res.status(200).send(user);
  } catch (error) {
    handleResponseError(res, error);
  }
});

// CREATE USER
router.post('/', async (req, res) => {
  try {
    const newUserIdObject = await usersService.addUser(req.body);

    res.status(201).send(newUserIdObject);
  } catch (error) {
    handleResponseError(res, error);
  }
});

// EDIT USER
// TODO
router.put('/:id', (req, res) => {
  res.status(400).send('Not implemented!');
});

// DELETE USER
// TODO
router.delete('/:id', (req, res) => {
  res.status(400).send('Not implemented!');
});

module.exports = router;