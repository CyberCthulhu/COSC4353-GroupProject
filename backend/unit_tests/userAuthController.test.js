const { signup, login, logout } = require("../controllers/userAuthController");
const User = require("../models/userAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models/userAuthModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Auth Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should create a new user and return a 201 status", async () => {
      const req = { body: { name: "testuser", password: "password123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      User.findOne.mockResolvedValue(null); // No existing user
      bcrypt.hash.mockResolvedValue("hashedPassword123");
      User.create.mockResolvedValue({ name: "testuser", password: "hashedPassword123" });

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "testuser" });
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(User.create).toHaveBeenCalledWith({
        name: "testuser",
        password: "hashedPassword123",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "User created successfully" });
    });

    it("should return a 400 status if the username is already taken", async () => {
      const req = { body: { name: "testuser", password: "password123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      User.findOne.mockResolvedValue({ name: "testuser" });

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "testuser" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Username already taken" });
    });

    it("should return a 500 status if an error occurs", async () => {
      const req = { body: { name: "testuser", password: "password123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockRejectedValue(new Error("Hashing error"));

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "testuser" });
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error creating user",
        err: expect.any(Error),
      });
    });
  });

  describe("login", () => {
    it("should log in a user and return a 201 status with a token", async () => {
      const req = { body: { name: "testuser", password: "password123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        cookie: jest.fn(),
      };

      const mockUser = { _id: "1", name: "testuser", password: "hashedPassword123" };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockToken");

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "testuser" });
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword123");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: "1", name: "testuser" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      expect(res.cookie).toHaveBeenCalledWith("token", "mockToken", { httpOnly: true });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        token: "mockToken",
      });
    });

    it("should return a 400 status if the username is not found", async () => {
      const req = { body: { name: "testuser", password: "password123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      User.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "testuser" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Username not found" });
    });

    it("should return a 400 status if the password is invalid", async () => {
      const req = { body: { name: "testuser", password: "wrongpassword" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockUser = { _id: "1", name: "testuser", password: "hashedPassword123" };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "testuser" });
      expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", "hashedPassword123");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" });
    });

    it("should return a 500 status if an error occurs", async () => {
      const req = { body: { name: "testuser", password: "password123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      User.findOne.mockRejectedValue(new Error("Database error"));

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ name: "testuser" });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error logging in",
        error: expect.any(Error),
      });
    });
  });

  describe("logout", () => {
    it("should log out a user and return a 200 status", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        cookie: jest.fn(),
      };

      await logout(req, res);

      expect(res.cookie).toHaveBeenCalledWith("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Logout successful" });
    });

    it("should return a 500 status if an error occurs", async () => {
        const req = {};
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          cookie: jest.fn().mockImplementation(() => {
            throw new Error("Cookie error");
          }),
        };
      
        await logout(req, res);
      
        expect(res.cookie).toHaveBeenCalledWith("token", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Error signing out",
          error: expect.any(Error),
        });
      });      
  });
});
