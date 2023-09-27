const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUpdateProfile, updateProfile);

module.exports = router;
