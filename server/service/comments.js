import { database } from "../database/connection.js";

export const getAll = async (freelanceId) => {
  try {
    return await database.Comments.findAll({
      where: { freelanceId },
      raw: true,
    });
  } catch {
    return false;
  }
};
export const getById = async (id) => {
  try {
    return await database.Comments.findByPk(id);
  } catch {
    return false;
  }
};

export const insert = async (data) => {
  try {
    const comments = new database.Comments(data);
    await comments.save();
    return comments.dataValues.id;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const _delete = async (id) => {
  try {
    await getById(id).destroy();
    return true;
  } catch {
    return false;
  }
};
