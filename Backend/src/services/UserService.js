const AppError = require("../utils/AppError");
const { encrypt, compare } = require("../configs/crypto");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create({ name, email, password, isAdmin }) {
    if (!name || !email) {
      throw new AppError("Name and email are required.");
    }

    const checkUserExists = await this.userRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError("Email already in use.");
    }

    const hashed_pwd = await encrypt(password);

    await this.userRepository.create({
      name,
      email,
      password: hashed_pwd,
      isAdmin
    });
  }

  async update({ user_id, name, email, password, old_password }) {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found.");
    }

    if (email) {
      const userWithEmail = await this.userRepository.findByEmail(email);
      if (userWithEmail && userWithEmail.id !== user_id) {
        throw new AppError("Email already in use.");
      }
    }

    if (password) {
      if (!old_password) {
        throw new AppError("Old password is required.");
      } else if (password === old_password) {
        throw new AppError("New password cannot be the same as old password.");
      }

      const isValid = await compare(old_password, user.password);
      if (!isValid) {
        throw new AppError("Old password does not match.");
      }

      user.password = await encrypt(password);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await this.userRepository.update(user_id, user);
    
    return user;
  }

  async show(id) {
    const user = await this.userRepository.show(id);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user;
  }
}

module.exports = UserService;