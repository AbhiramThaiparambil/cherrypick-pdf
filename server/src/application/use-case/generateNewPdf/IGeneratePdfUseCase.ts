import {
  GeneratePdfRequestDTO,
  GeneratePdfResponseDTO,
} from "../../dtos/usecase/GeneratePdf.dto";

export interface IGeneratePdfUseCase {
  execute(request: GeneratePdfRequestDTO): Promise<GeneratePdfResponseDTO>;
}
