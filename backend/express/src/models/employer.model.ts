import { Sequelize, DataTypes } from 'sequelize';

export const employerDTOSchema = {
  type: "object",
  properties: {
    id: {
      type: "number",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    numEmployees: {
      type: "number",
      required: true
    },
    headquarters: {
      type: "string",
      required: true
    }
  }
};

export const employerDefiner = (sequelize: Sequelize) => sequelize.define("employer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: { isInt: true }
    },
    name: { 
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: { len: [0, 64] }
    },
    numEmployees: { 
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: { isInt: true }
    },
    headquarters: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    underscored: true, // convert js camelCase names to sql snake_case names
    timestamps: false // disable implicit createdAt and updatedAt provided by sequelize
  }
);