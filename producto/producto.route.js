const express = require('express')
const router  = express.Router()

const ctrl = require('./producto.controller')

router.get('/',       ctrl.get)
router.post('/',      ctrl.post) 
router.put('/',       ctrl.editar) 
router.delete('/:id', ctrl.delete)  

router.get('/p/:id',  ctrl.detail) 
router.get('/c/:id',  ctrl.getByCategoria)
router.get('/t/:id',  ctrl.getByTag) 

module.exports = router;