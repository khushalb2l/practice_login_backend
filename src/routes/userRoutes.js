import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/protected", auth, (req, res) => {
  res.status(200).json({ message: "Inside protected route" });
});

export default router;
