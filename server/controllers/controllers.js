const jwtSign = require("../helpers/jwt");
const { User, Barang, Perusahaan, Transaksi } = require("../models");

class Controllers {
  // UNTUK USER
  static register(req, res, next) {
    const data = req.body;
    User.create(data)
      .then((data) => res.status(201).send(data))
      .catch((err) => res.send(err));
  }

  static login(req, res, next) {
    const data = req.body;
    User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        res.status(201).send(jwtSign({ id: data.id, email: data.email }));
      })
      .catch((err) => res.status(500).send(err));
  }
  // UNTUK BARANG
  static createBarang(req, res, next) {
    const data = req.body;
    Barang.create(data)
      .then((data) => res.status(201).send(data))
      .catch((err) => res.send(err));
  }

  static readBarang(req, res, next) {
    Barang.findAll({})
      .then((data) => res.status(200).send(data))
      .catch((err) => res.send(err));
  }

  static updateBarang(req, res, next) {
    const data = req.body;
    Barang.update(data, { where: { id: req.params.BarangId } })
      .then((data) => res.status(202).send(data))
      .catch((err) => res.send(err));
  }

  static deleteBarang(req, res, next) {
    Barang.destroy({ where: { id: req.params.BarangId } })
      .then((data) => res.status(202).send("Success"))
      .catch((err) => res.send("Error"));
  }
  // UNTUK PERUSAHAAN
  static createPerusahaan(req, res, next) {
    const data = req.body;
    Perusahaan.create(data)
      .then((data) => res.status(201).send(data))
      .catch((err) => res.send(err));
  }

  static readPerusahaan(req, res, next) {
    Perusahaan.findAll({})
      .then((data) => res.status(200).send(data))
      .catch((err) => res.send(err));
  }

  static updatePerusahaan(req, res, next) {
    const data = req.body;
    Perusahaan.update(data, { where: { id: req.params.PerusahaanId } })
      .then((data) => res.status(202).send(data))
      .catch((err) => res.send(err));
  }

  static deletePerusahaan(req, res, next) {
    Perusahaan.destroy({ where: { id: req.params.PerusahaanId } })
      .then((data) => res.status(202).send("Success"))
      .catch((err) => res.send("Error"));
  }
  // UNTUK TRANSAKSI
  static createTransaksi(req, res, next) {
    const data = req.body;
    Transaksi.create(data)
      .then((data) => res.status(201).send(data))
      .catch((err) => res.send(err));
  }

  static readTransaksi(req, res, next) {
    Transaksi.findAll({ include: [Barang, Perusahaan] })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.send(err));
  }

  static updateTransaksi(req, res, next) {
    const data = req.body;
    Transaksi.update(data, { where: { id: req.params.TransaksiId } })
      .then((data) => res.status(202).send(data))
      .catch((err) => res.send(err));
  }

  static deleteTransaksi(req, res, next) {
    Transaksi.destroy({ where: { id: req.params.TransaksiId } })
      .then((data) => res.status(202).send("Success"))
      .catch((err) => res.send("Error"));
  }
}

module.exports = Controllers;
