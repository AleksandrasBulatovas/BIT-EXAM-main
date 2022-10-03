import { DataTypes } from "sequelize";
import { freelancer } from "./Freelancer.js";

export const comments = (sequelize) => {
  const schema = {
    name: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull:false },
  };

  const Comments = sequelize.define("Comments", schema);
  const Freelancer = freelancer(sequelize);

  Freelancer.hasOne(Comments);
  Comments.belongsTo(Freelancer);

  return Comments;
};
