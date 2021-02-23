const express = require('express')
const router  = express.Router()

const ctrl = require('./carrito.controller')
const middle = require('../middleware')

router.get('/test',       ctrl.test)
router.get('/',       middle.isLoged, ctrl.get)
router.post('/',      middle.isLoged, ctrl.post)  
router.delete('/:id', middle.isLoged, ctrl.delete)  

module.exports = router;