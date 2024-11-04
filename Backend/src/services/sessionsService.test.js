const SessionsService = require("./SessionsService");
const AppError = require("../utils/AppError");

// Mock the auth config
jest.mock("../configs/auth", () => ({
  signToken: jest.fn(() => "mock_token")
}));

// Mock the crypto config
jest.mock("../configs/crypto", () => ({
  compare: jest.fn()
}));

describe("SessionsService", () => {
  let sessionsService;
  let sessionsRepositoryMock;

  beforeEach(() => {
    sessionsRepositoryMock = {
      findUserByEmail: jest.fn()
    };

    sessionsService = new SessionsService(sessionsRepositoryMock);
  });

  describe("createSession", () => {
    it("should create a session successfully", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashed_password",
        isAdmin: false
      };

      sessionsRepositoryMock.findUserByEmail.mockResolvedValue(mockUser);
      require("../configs/crypto").compare.mockResolvedValue(true);

      const result = await sessionsService.createSession({
        email: "test@example.com",
        password: "correct_password"
      });

      expect(result).toEqual({
        id: mockUser.id,
        token: "mock_token",
        isAdmin: mockUser.isAdmin
      });
    });

    it("should throw error when user is not found", async () => {
      sessionsRepositoryMock.findUserByEmail.mockResolvedValue(null);

      await expect(
        sessionsService.createSession({
          email: "nonexistent@example.com",
          password: "any_password"
        })
      ).rejects.toEqual(new AppError("Email and/or password incorrect.", 401));
    });

    it("should throw error when password is incorrect", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashed_password",
        isAdmin: false
      };

      sessionsRepositoryMock.findUserByEmail.mockResolvedValue(mockUser);
      require("../configs/crypto").compare.mockResolvedValue(false);

      await expect(
        sessionsService.createSession({
          email: "test@example.com",
          password: "wrong_password"
        })
      ).rejects.toEqual(new AppError("Email and/or password incorrect.", 401));
    });
  });
}); 