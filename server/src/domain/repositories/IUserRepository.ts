import { IUser } from "../entities/IUser";

export interface IUserRepository {
  create(data: Partial<IUser>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  hashPassword(password: string, saltRounds?: number): Promise<string>;
  comparePassword(
    userInputPassword: string,
    storedPassword: string,
  ): Promise<boolean>;
}
