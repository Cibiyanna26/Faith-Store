const express = require('express');
const router = express.Router()
const { registerUser, loginUser, logout, authUser } = require('../controllers/userControllers')
const { registerAdmin, loginAdmin, authAdmin } = require('../controllers/adminControllers')
const { authUserCookie, authAdminCookie } = require('../middlewares/checkCookie')
const { checkUserRegistration, checkUserLogin }  = require( '../middlewares/checkFormat');

router.route('/user').get(authUserCookie,authUser);
router.route('/register').post(checkUserRegistration,registerUser)
router.route('/login').post(checkUserLogin,loginUser)
router.route('/logout').get(authUserCookie, logout)

router.route('/admin').get(authAdminCookie, authAdmin);
router.route('/admin/register').post(checkUserRegistration, registerAdmin)
router.route('/admin/login').post(checkUserLogin, loginAdmin)
router.route('/admin/logout').get(authAdminCookie, logout)

module.exports = router;