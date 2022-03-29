'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaksi.belongsTo(models.Barang)
      Transaksi.belongsTo(models.Perusahaan)
    }
  };
  Transaksi.init({
    PerusahaanId: {
      type: DataTypes.INTEGER,
    },
    BarangId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Transaksi',
  });
  return Transaksi;
};