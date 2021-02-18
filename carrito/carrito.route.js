const express = require('express')
const router  = express.Router()

const ctrl = require('./carrito.controller')
const middle = require('../middleware')

router.get('/test',       ctrl.test)
router.get('/',       middle.isLoged, ctrl.get)
router.post('/',      ctrl.post)  
router.delete('/:id', ctrl.delete)  

module.exports = router;