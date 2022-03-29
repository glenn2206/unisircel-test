const Controllers = require('../controllers/controllers')

const barangRouter = require('express').Router()

barangRouter.post('/barang', Controllers.createBarang)
barangRouter.get('/barang', Controllers.readBarang)
barangRouter.put('/barang/:BarangId', Controllers.updateBarang)
barangRouter.delete('/barang/:BarangId', Controllers.deleteBarang)

module.exports = barangRouter