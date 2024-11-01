import { DataTypes } from '@sequelize/core';
import { Migration } from 'db/migrator';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.queryInterface.createTable('accounts', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  })
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.queryInterface.dropTable('accounts')
};
