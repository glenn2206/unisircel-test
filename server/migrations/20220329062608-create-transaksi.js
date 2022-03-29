'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PerusahaanId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Perusahaans',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      BarangId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Barangs',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transaksis');
  }
};