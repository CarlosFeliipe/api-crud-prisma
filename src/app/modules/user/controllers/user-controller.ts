import { NextFunction, Request, Response } from "express";
import { ServiceError } from "../../../../config/error";
import logger from "../../../../config/logger";
import { StatusCodes } from "../../../../enums/status-code";
import { IUserController, IUserService } from "../interfaces/user-interfaces";

export default class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  handle = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    logger.info("[UserController]::: Tentando cadastrar Usuário");

    try {
      const { name, email, password } = request.body;

      const user = await this.userService.execute({
        name,
        email,
        password,
      });

      response.status(StatusCodes.OK).json(user);
      return next();
    } catch (error: any) {
      if (error.isAxiosError) {
        const errorMessage = "Ocorreu um erro ao tentar cadastrar Usuário.";
        return next(new ServiceError(errorMessage));
      }
      next(error);
    }
  };
}
