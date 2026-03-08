import { UserResponseDTO } from "../../dtos/usecase/UserResponse.dto";

export interface IGetUserUseCase {
  execute(id: string): Promise<UserResponseDTO>;
}
