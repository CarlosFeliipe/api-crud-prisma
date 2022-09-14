import { NextFunction, Request, Response } from "express";

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  actived: boolean;
}

export interface IUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  actived: boolean;
}

export interface IUserRepository {
  create(data: IUserRequest): Promise<IUserResponse>;

  findOneUser(id: string): Promise<IUserResponse | null>;

  findOneUserByEmail(email: string): Promise<IUserResponse | null>;
}

export interface IUserController {
  handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

export interface IUserService {
  execute(data: IUserServiceRequest): Promise<IUserResponse | void>;
}
