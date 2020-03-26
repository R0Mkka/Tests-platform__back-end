const express = require('express');
const router = express.Router();

const usersService = require('../../services/users/users.service');

router.get('/', usersService.getUsers.bind(usersService));
router.get('/:id', usersService.getUserById.bind(usersService));
router.post('/', usersService.addUser.bind(usersService));
router.put('/:id', usersService.editUser.bind(usersService));
router.delete('/:id', usersService.deleteUser.bind(usersService));

module.exports = router;