const express = require('express')
const router  = express.Router()

const ctrl = require('./categoria.controller')

router.get('/',  ctrl.get)
router.post('/', ctrl.post) 
router.get('/:id', ctrl.detail) 
router.delete('/:id', ctrl.delete)  

module.exports = router;