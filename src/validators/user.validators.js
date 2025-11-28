import { body } from "express-validator";
import { ROLE_LIST } from "../constants/role.constants.js";

export const createUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone is required").isMobilePhone().withMessage("Invalid phone number"),
  body("role").notEmpty().isIn(ROLE_LIST).withMessage(`Role must be one of: ${ROLE_LIST.join(", ")}`),
];

export const updateUserValidator = [
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("role").optional().isIn(ROLE_LIST).withMessage(`Role must be one of: ${ROLE_LIST.join(", ")}`),
];
