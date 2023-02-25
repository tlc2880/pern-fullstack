const router = require("express").Router();
const {
  getUsers,
  register,
  login
} = require('../controllers/auth.controller')
const {
  validationMiddleware,
} = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middlewares/auth-middleware')

router.get('/get-users', getUsers)

router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)

module.exports = router