const AppError = require("../utils/AppError");
const { signToken } = require("../configs/auth");
const { compare } = require("../configs/crypto");

class SessionsService {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }

  async createSession({ email, password }) {
    const user = await this.sessionsRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Email and/or password incorrect.", 401);
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new AppError("Email and/or password incorrect.", 401);
    }

    const token = signToken({ userId: String(user.id), isAdmin: user.isAdmin });

    return {
      id: user.id,
      token,
      isAdmin: user.isAdmin
    };
  }
}

module.exports = SessionsService; 