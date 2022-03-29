const barangRouter = require('./barangRouter')
const perusahaanRouter = require('./perusahaanRouter')
const transaksiRouter = require('./traksaksiRouter')
const userRouter = require('./userRouter')
const router = require('express').Router()

router.use(userRouter)
router.use(barangRouter)
router.use(transaksiRouter)
router.use(perusahaanRouter)

module.exports = router