const express = require('express');
const router = express.Router()
const { addCategory, getCategory, deleteCategory,
        addSubCategory, getSubCategory, deleteSubCategory,
        addItems, getItems, deleteItems ,updateItems} = require('../controllers/adminProductControllers')
const {authAdminCookie } = require('../middlewares/checkCookie')


router.route('/category').get(getCategory)
                        .post(authAdminCookie, addCategory)
                        .delete(authAdminCookie, deleteCategory)


router.route('/subcategory').get(getSubCategory)
                            .post(authAdminCookie, addSubCategory)
                            .delete(authAdminCookie, deleteSubCategory)

router.route('/items')
                    .get(getItems)
                    .post(authAdminCookie, addItems)
                    .put(authAdminCookie,updateItems)
                    .delete(authAdminCookie,deleteItems)

module.exports = router;