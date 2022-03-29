const Controllers = require('../controllers/controllers')

const perusahaanRouter = require('express').Router()

perusahaanRouter.post('/perusahaan', Controllers.createPerusahaan)
perusahaanRouter.get('/perusahaan', Controllers.readPerusahaan)
perusahaanRouter.put('/perusahaan/:PerusahaanId', Controllers.updatePerusahaan)
perusahaanRouter.delete('/perusahaan/:PerusahaanId', Controllers.deletePerusahaan)

module.exports = perusahaanRouter