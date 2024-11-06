const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");

class UsersController {

  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    await userService.create({
      name,
      email,
      password,
      isAdmin
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    const user = await userService.update({
      user_id,
      name,
      email,
      password,
      old_password
    });

    return response.json(user);
  }

  async show(request, response) {
    const { id } = request.params;

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    const user = await userService.show(id);

    return response.json(user);
  }
}

module.exports = UsersController;
