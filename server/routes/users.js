const express = require('express');
const { getAllUsers, deleteUser, updateUser } = require('../controllers/users');
const router = express.Router()

router.delete('/delete_user', deleteUser)
router.get('/all_users', getAllUsers)
router.post('/update_user', updateUser)

module.exports = router