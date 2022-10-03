import { DataTypes } from "sequelize";
import { users } from "./users.js";

export const freelancer = (sequelize) => {
  const schema = {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    fl_image: { type: DataTypes.STRING, allowNull: false },
    service: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    Aproved: { type: DataTypes.INTEGER, allowNull: false },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  };

  const Freelancer = sequelize.define("Freelancer", schema);
  const Users = users(sequelize);

  Users.hasOne(Freelancer);
  Freelancer.belongsTo(Users);

  return Freelancer;
};
