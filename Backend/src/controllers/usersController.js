const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UsersController {

  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.create({
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
    const userCreateService = new UserCreateService(userRepository);

    const user = await userCreateService.update({
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
    const userCreateService = new UserCreateService(userRepository);

    const user = await userCreateService.show(id);

    return response.json(user);
  }
}

module.exports = UsersController;
