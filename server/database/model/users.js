import { DataTypes } from "sequelize";

export const users = (sequelize) => {
  const schema = {
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.INTEGER, defaultValue: 0 },
  };

  return sequelize.define("Users", schema);
};
