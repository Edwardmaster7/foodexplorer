const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")
const { signToken } = require("../configs/auth")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    if (!user) {
      throw new AppError("Email and/or password incorrect.", 401)
    }

    if (password !== user.password) {
      throw new AppError("Email and/or password incorrect.", 401)
    }

    const token = signToken({ id: user.id })

    return response.json({ token })
  }
}

module.exports = SessionsController