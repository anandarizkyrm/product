import { DataTypes } from 'sequelize';
import { sequelize } from '../../connection';

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    // paranoid: true,
    tableName: 'products',
  }
);
export { Product };
