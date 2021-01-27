const express = require('express')
const router  = express.Router()

const ctrl = require('./etiqueta.controller')

router.get('/',  ctrl.get)
router.post('/', ctrl.post) 
router.put('/', ctrl.editar) 
router.get('/:id', ctrl.detail) 
router.delete('/:id', ctrl.delete)  

module.exports = router;