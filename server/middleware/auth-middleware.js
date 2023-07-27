import ApiError from "../error/api-error.js";
import tokenService from "../service/token-service.js";

export default function (request, response, next) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizatedError());
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizatedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizatedError());
    }
    request.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizatedError());
  }
}
