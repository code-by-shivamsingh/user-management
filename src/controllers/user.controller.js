import {
  createUserService, deleteUserService, findUserByEmailService, findUserByPhoneService,
  getSingleUserService, getUsersService, updateUserService
} from "../services/user.service.js";

import { errorResponse, successResponse } from "../utils/response.utils.js";

export const createUserController = async (req,res)=>{
  try{
    const data = req.body;
    if(await findUserByEmailService(data.email)) return errorResponse(res,"Email already exists",400);
    if(await findUserByPhoneService(data.phone)) return errorResponse(res,"Phone already exists",400);
    const user = await createUserService(data);
    return successResponse(res,"User created successfully",user,201);
  }catch(err){ return errorResponse(res,err.message,500); }
};

export const getUserController = async (req,res)=>{
  try{
    const { id, page=1, search="" } = req.query;
    if(id){
      const user = await getSingleUserService(id);
      if(!user) return errorResponse(res,"User not found",404);
      return successResponse(res,"User fetched successfully",user);
    }
    const result = await getUsersService(Number(page),search);
    return successResponse(res,"Users fetched successfully",{ totalUsers: result.totalUsers, currentPage: Number(page), users: result.users });
  }catch(err){ return errorResponse(res,err.message,500); }
};

export const updateUserController = async (req,res)=>{
  try{
    const { id } = req.query; const data = req.body;
    if(data.email){ const emailExist = await findUserByEmailService(data.email); if(emailExist && emailExist._id.toString()!==id) return errorResponse(res,"Email already taken by another user",400);}
    if(data.phone){ const phoneExist = await findUserByPhoneService(data.phone); if(phoneExist && phoneExist._id.toString()!==id) return errorResponse(res,"Phone already taken by another user",400);}
    const updatedUser = await updateUserService(id,data);
    if(!updatedUser) return errorResponse(res,"User not found",404);
    return successResponse(res,"User updated successfully",updatedUser);
  }catch(err){ return errorResponse(res,err.message,500); }
};

export const deleteUserController = async (req,res)=>{
  try{
    const { id } = req.query;
    const deletedUser = await deleteUserService(id);
    if(!deletedUser) return errorResponse(res,"User not found",404);
    return successResponse(res,"User deleted successfully",deletedUser);
  }catch(err){ return errorResponse(res,err.message,500); }
};
