const UserService = require("./UserService");
const AppError = require("../utils/AppError");

// Mock the crypto config
jest.mock("../configs/crypto", () => ({
  encrypt: jest.fn(pwd => `hashed_${pwd}`),
  compare: jest.fn((pwd, hashedPwd) => pwd === hashedPwd.replace("hashed_", ""))
}));

describe("UserService", () => {
  let userService;
  let userRepositoryMock;

  beforeEach(() => {
    // Create a fresh mock for each test
    userRepositoryMock = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      show: jest.fn()
    };

    userService = new UserService(userRepositoryMock);
  });

  describe("create", () => {
    it("should create a user successfully", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        isAdmin: false
      };

      userRepositoryMock.findByEmail.mockResolvedValue(null);

      await userService.create(userData);

      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepositoryMock.create).toHaveBeenCalledWith({
        ...userData,
        password: `hashed_${userData.password}`
      });
    });

    it("should throw error when name is missing", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123"
      };

      await expect(userService.create(userData))
        .rejects
        .toEqual(new AppError("Name and email are required."));
    });

    it("should throw error when email already exists", async () => {
      const userData = {
        name: "Test User",
        email: "existing@example.com",
        password: "password123"
      };

      userRepositoryMock.findByEmail.mockResolvedValue({ id: 1, email: userData.email });

      await expect(userService.create(userData))
        .rejects
        .toEqual(new AppError("Email already in use."));
    });
  });

  describe("update", () => {
    const mockUser = {
      id: 1,
      name: "Original Name",
      email: "original@example.com",
      password: "hashed_oldpassword123"
    };

    it("should update user successfully", async () => {
      const updateData = {
        user_id: 1,
        name: "New Name",
        email: "new@example.com"
      };

      userRepositoryMock.findById.mockResolvedValue(mockUser);
      userRepositoryMock.findByEmail.mockResolvedValue(null);

      await userService.update(updateData);

      expect(userRepositoryMock.update).toHaveBeenCalledWith(1, {
        ...mockUser,
        name: updateData.name,
        email: updateData.email
      });
    });

    it("should update password successfully", async () => {
      const updateData = {
        user_id: 1,
        password: "newpassword123",
        old_password: "oldpassword123"
      };

      userRepositoryMock.findById.mockResolvedValue(mockUser);

      await userService.update(updateData);

      expect(userRepositoryMock.update).toHaveBeenCalledWith(1, {
        ...mockUser,
        password: `hashed_${updateData.password}`
      });
    });

    it("should throw error when user not found", async () => {
      userRepositoryMock.findById.mockResolvedValue(null);

      await expect(userService.update({ user_id: 999 }))
        .rejects
        .toEqual(new AppError("User not found."));
    });

    it("should throw error when email is already in use by another user", async () => {
      const updateData = {
        user_id: 1,
        email: "taken@example.com"
      };

      userRepositoryMock.findById.mockResolvedValue(mockUser);
      userRepositoryMock.findByEmail.mockResolvedValue({ id: 2, email: updateData.email });

      await expect(userService.update(updateData))
        .rejects
        .toEqual(new AppError("Email already in use."));
    });

    it("should throw error when old password is not provided", async () => {
      const updateData = {
        user_id: 1,
        password: "newpassword123"
      };

      userRepositoryMock.findById.mockResolvedValue(mockUser);

      await expect(userService.update(updateData))
        .rejects
        .toEqual(new AppError("Old password is required."));
    });

    it("should throw error when old password is incorrect", async () => {
      const updateData = {
        user_id: 1,
        password: "newpassword123",
        old_password: "wrongpassword"
      };

      userRepositoryMock.findById.mockResolvedValue(mockUser);

      await expect(userService.update(updateData))
        .rejects
        .toEqual(new AppError("Old password does not match."));
    });
  });

  describe("show", () => {
    it("should return user successfully", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com"
      };

      userRepositoryMock.show.mockResolvedValue(mockUser);

      const result = await userService.show(1);

      expect(result).toEqual(mockUser);
      expect(userRepositoryMock.show).toHaveBeenCalledWith(1);
    });

    it("should throw error when user not found", async () => {
      userRepositoryMock.show.mockResolvedValue(null);

      await expect(userService.show(999))
        .rejects
        .toEqual(new AppError("User not found.", 404));
    });
  });
}); 