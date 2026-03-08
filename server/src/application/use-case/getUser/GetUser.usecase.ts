import { inject, injectable } from "tsyringe";
import { IGetUserUseCase } from "./IGetUser.usecase";
import { UserResponseDTO } from "../../dtos/usecase/UserResponse.dto";
import { REPOSITORY_TOKEN } from "../../../constant/tocken";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AppError } from "../../AppError";
import { HTTP_STATUS } from "../../../constant/httpStatus";

@injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    @inject(REPOSITORY_TOKEN.USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    return {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
