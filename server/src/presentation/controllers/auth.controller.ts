import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { USECASE_TOKEN } from "../../constant/tocken";
import { ISignupUseCase } from "../../application/use-case/signup/ISignup.usecase";
import { ILoginUseCase } from "../../application/use-case/login/ILogin.usecase";
import { SignupRequestDTO } from "../../application/dtos/usecase/Signup.dto";
import { LoginRequestDTO } from "../../application/dtos/usecase/Login.dto";
import { AppError } from "../../application/AppError";
import { HTTP_STATUS } from "../../constant/httpStatus";

@injectable()
export class AuthController {
  constructor(
    @inject(USECASE_TOKEN.SIGNUP_USECASE) private signupUseCase: ISignupUseCase,
    @inject(USECASE_TOKEN.LOGIN_USECASE) private loginUseCase: ILoginUseCase,
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

      res.status(201).json(result);
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

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
