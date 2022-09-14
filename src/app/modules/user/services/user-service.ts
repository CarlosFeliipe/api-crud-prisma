import { hash } from "bcryptjs";
import { ServiceError, ValidationError } from "../../../../config/error";
import logger from "../../../../config/logger";
import {
  IUserRepository,
  IUserRequest,
  IUserResponse,
  IUserService,
} from "../interfaces/user-interfaces";

export default class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: IUserRequest): Promise<IUserResponse | void> {
    logger.info("[UserService]::: Cadastrando Usuário");

    try {
      const emailExists = await this.userRepository.findOneUserByEmail(
        data.email
      );

      if (emailExists) {
        throw new ValidationError("Usuário já cadastrado.");
      }

      const passHash = await hash(data.password, 8);

      const response = await this.userRepository.create({
        ...data,
        password: passHash,
        actived: true,
      });
      logger.info("[UserService]::: Usuário cadastrado com Sucesso.");
      return response;
    } catch (error) {
      const errorMessage = "Ocorreu um erro ao tentar cadastrar usuário.";
      logger.error(errorMessage);
      throw new ServiceError(errorMessage);
    }
  }
}
