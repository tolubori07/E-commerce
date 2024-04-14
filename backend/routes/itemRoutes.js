const express = require('express')
const router = express.Router()
const{addItem,getItems,getItem,getUserItems,getBag,addToBag}= require('../controllers/itemController')
const protect = require('../middleware/authMiddleware')
router.route('/').post(protect, addItem).get(getItems);
router.route('/myproducts').get(protect, getUserItems); // Place before /:id route
router.route('/:id').get(getItem);

module.exports = router
