import { Sequelize, DataTypes } from 'sequelize';

export const jobDefiner = (sequelize: Sequelize) => sequelize.define("job", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: { isInt: true }
    },
    title: { 
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: { len: [0, 64] }
    },
    employerId: { 
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: { isInt: true }
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [0, 255] }
    },
    fullDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    underscored: true, // convert js camelCase names to sql snake_case names
    timestamps: true // implicit createdAt and updatedAt provided by sequelize
  }
);