import {
  LoginRequestDTO,
  LoginResponseDTO,
} from "../../dtos/usecase/Login.dto";

export interface ILoginUseCase {
  execute(data: LoginRequestDTO): Promise<LoginResponseDTO>;
}
