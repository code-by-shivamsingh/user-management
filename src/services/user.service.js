import { User } from "../models/user.model.js";

export const createUserService = async (data) => User.create(data);
export const findUserByEmailService = async (email) => User.findOne({ email, isDeleted: false });
export const findUserByPhoneService = async (phone) => User.findOne({ phone, isDeleted: false });

export const getUsersService = async (page = 1, search = "") => {
  const limit = 10, skip = (page-1)*limit;
  const baseFilter = { isDeleted: false };
  const searchFilter = search ? { $or:[{name:{$regex:search,$options:"i"}},{email:{$regex:search,$options:"i"}}] } : {};
  const finalFilter = { ...baseFilter, ...searchFilter };
  const totalUsers = await User.countDocuments(finalFilter);
  const users = await User.find(finalFilter).skip(skip).limit(limit).sort({ createdAt: -1 });
  return { totalUsers, totalPages: Math.ceil(totalUsers/limit), users };
};
export const getSingleUserService = async (id) => User.findOne({ _id:id, isDeleted:false });
export const updateUserService = async (id, data) => User.findOneAndUpdate({ _id:id, isDeleted:false }, data, { new:true });
export const deleteUserService = async (id) => User.findByIdAndUpdate(id, { isDeleted:true }, { new:true });
