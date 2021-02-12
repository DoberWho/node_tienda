const express = require('express')
const router  = express.Router()
const m = require('../middleware')

const ctrl = require('./categoria.controller')

router.get('/',                    ctrl.get)
router.post('/',      m.isAdmin,   ctrl.post) 
router.put('/',       m.isAdmin,   ctrl.editar) 
router.get('/:id',                 ctrl.detail) 
router.delete('/:id', m.isAdmin,   ctrl.delete)  

module.exports = router;