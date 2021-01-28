const express = require('express')
const router  = express.Router()

const ctrl = require('./auth.controller')

router.post('/register', ctrl.register) 
router.post('/login',    ctrl.login) 
router.put('/',          ctrl.editar) 
router.get('/me',        ctrl.detail) // Current User
router.get('/:id',       ctrl.detail) // Cualquier Otro Usuario

router.get('/',          ctrl.get)  // ADMIN
router.delete('/:id',    ctrl.delete)  // ADMIN
 
module.exports = router;