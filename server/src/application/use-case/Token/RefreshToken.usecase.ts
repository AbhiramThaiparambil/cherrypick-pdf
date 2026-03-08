import { inject, injectable } from "tsyringe";
import { SERVICE_TOKEN } from "../../../constant/tocken";
import { ITokenService } from "../../../services/Token/IToken.service";
import {
  IRefreshTokenUseCase,
  IRequestTokenDTO,
  IResponseTokenDTO,
} from "./IRefreshToken.usecase";
@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    @inject(SERVICE_TOKEN.TOKEN_SERVICE) private tokenService: ITokenService,
  ) {}
  async execute(data: IRequestTokenDTO): Promise<IResponseTokenDTO> {
    const { refreshToken } = data;
    const payload = this.tokenService.verifyRefreshToken(refreshToken);
    console.log("payload :" + payload);

    const userId = payload.userId;
    const accessToken = await this.tokenService.generateAccessToken(userId);
    return {
      accessToken,
    };
  }
}
