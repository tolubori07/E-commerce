const protect = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()
const{getBag,addToBag}= require('../controllers/itemController')

router.route('/').get(protect,getBag)
router.route('/').post(protect,addToBag)
module.exports = router
