export interface thumbnailGenerationRequestDto {
  filePath: string;
  page: number;
  limit: number;
}

export interface thumbnailGenerationResponseDto {
  thumbnails: { thumbnail: string; page: number }[];
  //   fileName: string;
  count: number;
}
