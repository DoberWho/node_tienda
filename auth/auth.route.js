const express = require('express')
const router  = express.Router()

const ctrl = require('./auth.controller')


router.post('/register', ctrl.register) 
router.post('/login',    ctrl.login) 
router.put('/',          ctrl.editar) 
router.get('/me',        ctrl.detail)
router.get('/:id',       ctrl.detail) 

router.get('/',          ctrl.get) 
router.delete('/:id',    ctrl.delete)  
 
module.exports = router;