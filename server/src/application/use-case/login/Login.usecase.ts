import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ILoginUseCase } from "./ILogin.usecase";
import {
  LoginRequestDTO,
  LoginResponseDTO,
} from "../../dtos/usecase/Login.dto";
import { AppError } from "../../AppError";
import { HTTP_STATUS } from "../../../constant/httpStatus";
import { REPOSITORY_TOKEN, SERVICE_TOKEN } from "../../../constant/tocken";
import { ITokenService } from "../../../services/Token/IToken.service";

@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(REPOSITORY_TOKEN.USER_REPOSITORY)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKEN.TOKEN_SERVICE) private tokenService: ITokenService,
  ) {}

  async execute(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.CONFLICT);
    }
    const isMatch = await this.userRepository.comparePassword(
      password,
      user.password,
    );
    if (!isMatch) {
      throw new AppError("password not match", HTTP_STATUS.BAD_REQUEST);
    }

    const accessToken = this.tokenService.generateAccessToken(user._id);
    const refreshToken = this.tokenService.generateAccessToken(user._id);

    return {
      _id: user._id + "",
      email: user.email,
      accessToken,
      refreshToken,
    };
  }
}
