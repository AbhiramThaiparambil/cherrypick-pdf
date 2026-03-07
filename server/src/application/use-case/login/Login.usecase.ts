import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ILoginUseCase } from "./ILogin.usecase";
import {
  LoginRequestDTO,
  LoginResponseDTO,
} from "../../dtos/usecase/Login.dto";
import { AppError } from "../../AppError";
import { HTTP_STATUS } from "../../../constant/httpStatus";
import { REPOSITORY_TOKEN } from "../../../constant/tocken";

@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(REPOSITORY_TOKEN.USER_REPOSITORY)
    private userRepository: IUserRepository,
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

    return {
      _id: user._id + "",
      email: user.email,
      token: "",
    };
  }
}
