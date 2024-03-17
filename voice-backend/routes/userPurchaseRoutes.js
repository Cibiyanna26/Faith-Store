const express = require('express')
const router = express.Router()
const {authUserCookie} = require('../middlewares/checkCookie')
const { newPurchase, getPurchases } = require('../controllers/userPurchaseControllers')
const { checkNewPurchase } = require('../middlewares/checkFormat')

router.route('/').get(authUserCookie,getPurchases).post(authUserCookie,checkNewPurchase, newPurchase)


module.exports = router;