import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ISignupUseCase } from "./ISignup.usecase";
import {
  SignupRequestDTO,
  SignupResponseDTO,
} from "../../dtos/usecase/Signup.dto";
import { AppError } from "../../AppError";
import { HTTP_STATUS } from "../../../constant/httpStatus";
import { REPOSITORY_TOKEN } from "../../../constant/tocken";

@injectable()
export class SignupUseCase implements ISignupUseCase {
  constructor(
    @inject(REPOSITORY_TOKEN.USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}

  async execute(data: SignupRequestDTO): Promise<SignupResponseDTO> {
    const ifExist = await this.userRepository.findByEmail(data.email);
    const { email, password } = data;
    if (ifExist) {
      throw new AppError("User already exists", HTTP_STATUS.CONFLICT);
    }

    const hashPassword = await this.userRepository.hashPassword(password);

    const userData: SignupRequestDTO = {
      email: email,
      password: hashPassword,
    };

    const user = await this.userRepository.create(userData);

    return {
      id: user._id!,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
