const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signup, login } = require("../controllers/adminAuthController");
const User = require("../models/adminAuthModel");

jest.mock("../models/adminAuthModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Admin Auth Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should create a new user and return 201 status", async () => {
      const req = { body: { name: "admin", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword123");
      User.create.mockResolvedValue({ name: "admin", password: "hashedPassword123" });

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "admin" });
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(User.create).toHaveBeenCalledWith({ name: "admin", password: "hashedPassword123" });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "User created successfully" });
    });

    it("should return 400 if the username is already taken", async () => {
      const req = { body: { name: "admin", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValue({ name: "admin" });

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "admin" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Username already taken" });
    });

    it("should return 500 if an error occurs during user creation", async () => {
      const req = { body: { name: "admin", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword123");
      User.create.mockRejectedValue(new Error("Database error"));

      await signup(req, res);

      expect(User.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error creating user", err: new Error("Database error") });
    });
  });

  describe("login", () => {
    it("should login successfully and return 201 status with token", async () => {
      const req = { body: { name: "admin", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      };

      const mockUser = { _id: "123", name: "admin", password: "hashedPassword123" };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockToken123");

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "admin" });
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword123");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser._id, name: mockUser.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      expect(res.cookie).toHaveBeenCalledWith("token", "mockToken123", { httpOnly: true });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Login successful", token: "mockToken123" });
    });

    it("should return 400 if username is not found", async () => {
      const req = { body: { name: "admin", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "admin" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Username not found" });
    });

    it("should return 400 if the password is invalid", async () => {
      const req = { body: { name: "admin", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = { _id: "123", name: "admin", password: "hashedPassword123" };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword123");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" });
    });

    it("should return 500 if an error occurs during login", async () => {
      const req = { body: { name: "admin", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockRejectedValue(new Error("Database error"));

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "admin" });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error logging in",
        error: new Error("Database error"),
      });
    });
  });
});
