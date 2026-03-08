import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

const authController = container.resolve(AuthController);

authRouter.post("/signup", authController.signup.bind(authController));
authRouter.post("/refresh", authController.refreshToken.bind(authController));

authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/logout", authController.logout.bind(authController));

authRouter.get("/user", authMiddleware, authController.getUser.bind(authController));

export default authRouter;
