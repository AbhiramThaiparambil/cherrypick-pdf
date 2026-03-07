import {
  GetUserUploadedPdfsRequestDTO,
  IGetUserUploadedPdfsResponseDTO,
} from "../../dtos/usecase/GetUserUploadedPdfs.dto";

export interface IGetUserUploadedPdfsUseCase {
  execute(
    data: GetUserUploadedPdfsRequestDTO,
  ): Promise<IGetUserUploadedPdfsResponseDTO[]>;
}
