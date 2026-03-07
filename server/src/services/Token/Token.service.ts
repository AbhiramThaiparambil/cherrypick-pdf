import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { ITokenService } from "./IToken.service";

@injectable()
export class TokenService implements ITokenService {
  generateAccessToken(userId: string): string {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
      throw new Error("ACCESS_TOKEN_SECRET missing");
    }

    return jwt.sign({ userId }, accessTokenSecret, { expiresIn: "15m" });
  }

  generateRefreshToken(userId: string): string {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!refreshTokenSecret) {
      throw new Error("REFRESH_TOKEN_SECRET missing");
    }

    return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: "7d" });
  }

  verifyAccessToken(token: string): { userId: string } {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
      throw new Error("ACCESS_TOKEN_SECRET missing");
    }

    return jwt.verify(token, accessTokenSecret) as { userId: string };
  }

  verifyRefreshToken(token: string): { userId: string } {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!refreshTokenSecret) {
      throw new Error("REFRESH_TOKEN_SECRET missing");
    }

    return jwt.verify(token, refreshTokenSecret) as { userId: string };
  }
}
