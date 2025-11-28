import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response.utils.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(
      res,
      "Validation failed",
      422,
      errors.array().map(err => ({ field: err.path, message: err.msg }))
    );
  }
  next();
};
