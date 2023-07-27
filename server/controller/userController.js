import UserModel from "../model/users.js";
import userService from "../service/user-service.js";

class UserController {
  async registration(request, response, next) {
    try {
      const { email, password, username } = request.body;
      const userData = await userService.registration(
        email,
        password,
        username
      );
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(request, response, next) {
    try {
      const { email, password } = request.body;
      const userData = await userService.login(email, password);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(request, response, next) {
    try {
      const { refreshToken } = request.cookies;
      const token = await userService.logout(refreshToken);
      response.clearCookie("refreshToken");
      return response.status(200).json({ message: "Вы успешно вышли" });
    } catch (error) {
      next(error);
    }
  }

  async refresh(request, response, next) {
    try {
      const { refreshToken } = request.cookies;
      const userData = await userService.refresh(refreshToken);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(request, response, next) {
    try {
      const users = await userService.getAllUsers();
      return response.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
