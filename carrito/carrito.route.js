const express = require('express')
const router  = express.Router()

const ctrl = require('./carrito.controller')

router.get('/test',       ctrl.test)
router.get('/',       ctrl.get)
router.post('/',      ctrl.post)  
router.delete('/:id', ctrl.delete)  

module.exports = router;