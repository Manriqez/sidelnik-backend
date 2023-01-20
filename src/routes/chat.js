const router = require('express-promise-router')()

const { chat } = require('../controllers')

router.route('/:id').get(chat.get)
router.route('/').post(chat.create)
router.route('/').get(chat.getAll)
router.route('/:id').put(chat.update)
router.route('/:id').delete(chat.delete)

module.exports = router
