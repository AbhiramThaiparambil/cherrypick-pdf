import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ITokenService } from "../../services/Token/IToken.service";
import { SERVICE_TOKEN } from "../../constant/tocken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access token missing",
      });
    }

    const tokenService = container.resolve<ITokenService>(
      SERVICE_TOKEN.TOKEN_SERVICE,
    );

    const payload = tokenService.verifyAccessToken(token);

    res.locals.userId = payload.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};
