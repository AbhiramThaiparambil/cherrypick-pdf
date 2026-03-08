import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { USECASE_TOKEN } from "../../constant/tocken";
import { ISignupUseCase } from "../../application/use-case/signup/ISignup.usecase";
import { ILoginUseCase } from "../../application/use-case/login/ILogin.usecase";
import { SignupRequestDTO } from "../../application/dtos/usecase/Signup.dto";
import { LoginRequestDTO } from "../../application/dtos/usecase/Login.dto";
import { AppError } from "../../application/AppError";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { sendRefreshToken } from "../../utils/sendToken";
import {
  IRefreshTokenUseCase,
  IRequestTokenDTO,
} from "../../application/use-case/Token/IRefreshToken.usecase";
import { IGetUserUseCase } from "../../application/use-case/getUser/IGetUser.usecase";

@injectable()
export class AuthController {
  constructor(
    @inject(USECASE_TOKEN.SIGNUP_USECASE) private signupUseCase: ISignupUseCase,
    @inject(USECASE_TOKEN.LOGIN_USECASE) private loginUseCase: ILoginUseCase,
    @inject(USECASE_TOKEN.REFRESH_TOKEN_USECASE)
    private refreshTokenUseCase: IRefreshTokenUseCase,
    @inject(USECASE_TOKEN.GET_USER_USECASE)
    private getUserUseCase: IGetUserUseCase,
  ) {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError(
          "Email and password are required",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      const signupDTO: SignupRequestDTO = {
        email,
        password,
      };

      const result = await this.signupUseCase.execute(signupDTO);

      // sendAccessToken(res, result.accessToken);
      sendRefreshToken(res, result.refreshToken);

      res.status(HTTP_STATUS.CREATED).json({
        _id: result.id,
        email: result.email,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError(
          "Email and password are required",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      if (typeof email !== "string" || typeof password !== "string") {
        throw new AppError("Invalid input type", HTTP_STATUS.BAD_REQUEST);
      }

      const loginDTO: LoginRequestDTO = {
        email,
        password,
      };

      const result = await this.loginUseCase.execute(loginDTO);
      // sendAccessToken(res, result.accessToken);
      sendRefreshToken(res, result.refreshToken);

      res.status(HTTP_STATUS.OK).json({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      console.log(refreshToken);
      console.log(req.cookies);
      if (!refreshToken) {
        throw new AppError("Refresh token missing", HTTP_STATUS.UNAUTHORIZED);
      }

      const requestData: IRequestTokenDTO = {
        refreshToken,
      };
      const data = await this.refreshTokenUseCase.execute(requestData);
      res.status(HTTP_STATUS.OK).json({ accessToken: data.accessToken });
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(HTTP_STATUS.OK).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }


  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.userId;

      if (!userId) {
        throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
      }

      const user = await this.getUserUseCase.execute(userId);

      res.status(HTTP_STATUS.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}
