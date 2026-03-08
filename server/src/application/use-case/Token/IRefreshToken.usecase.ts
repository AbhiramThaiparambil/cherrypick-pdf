export interface IRequestTokenDTO {
  refreshToken: string;
}

export interface IResponseTokenDTO {
  accessToken: string;
}
export interface IRefreshTokenUseCase {
  execute(data: IRequestTokenDTO): Promise<IResponseTokenDTO>;
}
