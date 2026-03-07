import {
    SignupRequestDTO,
  SignupResponseDTO,
} from "../../dtos/usecase/Signup.dto";

export interface ISignupUseCase {
  execute(data: SignupRequestDTO): Promise<SignupResponseDTO>;
}
