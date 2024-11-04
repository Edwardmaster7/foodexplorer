const SessionsRepository = require("../repositories/SessionsRepository");
const SessionsService = require("../services/SessionsService");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const sessionsRepository = new SessionsRepository();
    const sessionsService = new SessionsService(sessionsRepository);

    const session = await sessionsService.createSession({ email, password });

    return response.json(session);
  }
}

module.exports = SessionsController;