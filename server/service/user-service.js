import UserModel from "../model/users.js";
import { hash, compareSync } from "bcrypt";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../error/api-error.js";

class UserService {
  async registration(email, password, username) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} занят`
      );
    }
    const hashPassword = await hash(password, 3);
    const user = await UserModel.create({
      email,
      password: hashPassword,
      username,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с такими данными не найден");
    }
    const isPasswordEquals = compareSync(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest(
        `Неверный пароль, ${password}, ${user.password}`
      );
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizatedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if(!userData || !tokenFromDb){
      throw ApiError.UnauthorizatedError(); 
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers(  ) {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      next(error);
    }
  }
}

export default new UserService();
