import { DeletePdfRequestDTO } from "../../dtos/usecase/DeletePdf.dto";

export interface IDeletePdfUseCase {
  execute(data: DeletePdfRequestDTO): Promise<boolean>;
}
