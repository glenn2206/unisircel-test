const Controllers = require('../controllers/controllers')

const transaksiRouter = require('express').Router()

transaksiRouter.post('/transaksi', Controllers.createTransaksi)
transaksiRouter.get('/transaksi', Controllers.readTransaksi)
transaksiRouter.put('/transaksi/:TransaksiId', Controllers.updateTransaksi)
transaksiRouter.delete('/transaksi/:TransaksiId', Controllers.deleteTransaksi)

module.exports = transaksiRouter