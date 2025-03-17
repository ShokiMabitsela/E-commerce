
import {
  remove,
  getAll,
  getSingle,
  update,
} from "../service/crudHandlerFactory.js";
import User from "../models/userModel.js";

export const getAllUser = getAll(User);
export const getUser = getSingle(User);
export const removeUser = remove(User);
export const updateUser = update(User);
