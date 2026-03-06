export interface GetPdfThumbnailsUseCaseRequestDTO {
  _id: string;
  page: number;
  limit: number;
}

export interface GetPdfThumbnailsUseCaseResponseDTO {
  thumbnails: { thumbnail: string; page: number }[];
  fileName: string;
  count: number;
}
