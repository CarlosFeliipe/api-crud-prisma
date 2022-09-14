import prismaClient from "../../../../config/database/prisma/prismaClient";
import {
  IUserRepository,
  IUserRequest,
  IUserResponse,
} from "../interfaces/user-interfaces";

export default class UserRepository implements IUserRepository {
  async create(data: IUserRequest): Promise<IUserResponse> {
    const user = await prismaClient.user.create({ data });
    return user;
  }

  async findOneUser(id: string): Promise<IUserResponse | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  }

  async findOneUserByEmail(email: string): Promise<IUserResponse | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
}
