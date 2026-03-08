import { injectable } from "tsyringe";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUser } from "../../domain/entities/IUser";
import { UserModel } from "../database/user.model";
import bcrypt from "bcrypt";
@injectable()
export class UserRepository implements IUserRepository {
  async create(data: Partial<IUser>): Promise<IUser> {
    const user = await UserModel.create({
      email: data.email,
      password: data.password,
      createdAt: new Date(),
    });

    return {
      _id: user._id.toString(),
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    };
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email }).lean().exec();

    if (!user) return null;

    return {
      _id: user._id.toString(),
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    };
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id).lean().exec();

    if (!user) return null;

    return {
      _id: user._id.toString(),
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    };
  }


  comparePassword(
    userInputPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(userInputPassword, storedPassword);
  }

  hashPassword(password: string, saltRounds: number = 10): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }
}
