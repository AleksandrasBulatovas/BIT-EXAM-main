import { database } from "../database/connection.js";

export const getAll = async (conditions = {}) => {
  try {
    conditions.raw = true;
    return await database.Freelancer.findAll(conditions);
  } catch {
    return false;
  }
};

export const getById = async (id) => {
  try {
    return await database.Freelancer.findByPk(id);
  } catch {
    return false;
  }
};

export const getByUserId = async (id) => {
  try {
    return await database.Freelancer.findAll({
      where: {
        UserId: id,
      },
    });
  } catch {
    return false;
  }
};

export const insert = async (data) => {
  try {
    const freelancer = new database.Freelancer(data);
    await freelancer.save();

    return freelancer.dataValues.id;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const _delete = async (id) => {
  try {
    const CrowdFunder = await getById(id);
    await CrowdFunder.destroy();
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const _update = async (id, data) => {
  try {
    console.log(id, data);
    const te = await database.Freelancer.update(data, { where: { id } });
    console.log(te);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
