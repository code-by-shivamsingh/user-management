import { Router } from "express";
import { createUserController,getUserController,updateUserController,deleteUserController } from "../controllers/user.controller.js";
import { createUserValidator,updateUserValidator } from "../validators/user.validators.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/", createUserValidator, validate, createUserController);
router.get("/", getUserController);
router.patch("/", updateUserValidator, validate, updateUserController);
router.delete("/", deleteUserController);

export default router;
