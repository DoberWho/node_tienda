const express = require('express')
const router  = express.Router()

const ctrl   = require('./auth.controller')
const middle = require('../middleware')

router.post('/register',                    ctrl.register) 
router.post('/login',                       ctrl.login) 
router.put('/',         middle.isLoged,     ctrl.editar) 
router.get('/me',       middle.isLoged,     ctrl.detail) // Current User
router.get('/:id',      middle.isLoged,     ctrl.detail) // Cualquier Otro Usuario

router.get('/',         middle.isAdmin, ctrl.get)  // ADMIN
router.delete('/:id',   middle.isAdmin, ctrl.delete)  // ADMIN
 
module.exports = router;