const mongoose = require("mongoose");
const { getProfiles, getProfileById, updateProfileById, createProfile } = require("../controllers/profileController");
const Profile = require("../models/profilesModel");

jest.mock("../models/profilesModel");

beforeAll(() => {
  // Mock mongoose.Types.ObjectId.isValid globally
  jest.spyOn(mongoose.Types.ObjectId, "isValid").mockImplementation((id) => id === "1");
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Profile Controller", () => {
  describe("getProfiles", () => {
    it("should return profiles with a 200 status", async () => {
      const mockProfiles = [
        { _id: "1", name: "John Doe" },
        { _id: "2", name: "Jane Doe" },
      ];
      Profile.find.mockResolvedValue(mockProfiles);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfiles(req, res);

      expect(Profile.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProfiles);
    });

    it("should handle errors and return a 500 status", async () => {
      const error = new Error("Database error");
      Profile.find.mockRejectedValue(error);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfiles(req, res);

      expect(Profile.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching profiles",
        error,
      });
    });
  });

  describe("getProfileById", () => {
    it("should return a profile with a 200 status", async () => {
      const mockProfile = { _id: "1", name: "John Doe" };
      Profile.findById.mockResolvedValue(mockProfile);

      const req = { params: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfileById(req, res);

      expect(Profile.findById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProfile);
    });

    it("should return a 400 status for an invalid ID", async () => {
      const req = { params: { id: "invalid-id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfileById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid profile ID format",
      });
    });

    it("should return a 404 status if the profile is not found", async () => {
      Profile.findById.mockResolvedValue(null);

      const req = { params: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfileById(req, res);

      expect(Profile.findById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Profile not found",
      });
    });

    it("should return a 500 status if findById fails", async () => {
      const error = new Error("Database error");
      Profile.findById.mockRejectedValue(error);

      const req = { params: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfileById(req, res);

      expect(Profile.findById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error,
      });
    });
  });

  describe("updateProfileById", () => {
    it("should update a profile and return it with a 200 status", async () => {
      const mockProfile = { _id: "1", name: "Updated Name" };
      Profile.findByIdAndUpdate.mockResolvedValue(mockProfile);

      const req = { params: { id: "1" }, body: { name: "Updated Name" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateProfileById(req, res);

      expect(Profile.findByIdAndUpdate).toHaveBeenCalledWith("1", req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Profile updated successfully",
        profile: mockProfile,
      });
    });

    it("should return a 400 status for an invalid ID", async () => {
      const req = { params: { id: "invalid-id" }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateProfileById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid profile ID format",
      });
    });

    it("should return a 404 status if the profile is not found", async () => {
      Profile.findByIdAndUpdate.mockResolvedValue(null);

      const req = { params: { id: "1" }, body: { name: "Updated Name" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateProfileById(req, res);

      expect(Profile.findByIdAndUpdate).toHaveBeenCalledWith("1", req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Profile not found",
      });
    });

    it("should return a 500 status if findByIdAndUpdate fails", async () => {
      const error = new Error("Database error");
      Profile.findByIdAndUpdate.mockRejectedValue(error);

      const req = { params: { id: "1" }, body: { name: "Updated Name" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateProfileById(req, res);

      expect(Profile.findByIdAndUpdate).toHaveBeenCalledWith("1", req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error,
      });
    });
  });

  describe("createProfile", () => {
    it("should create a new profile and return it with a 201 status", async () => {
      const mockProfile = { _id: "1", name: "New Profile" };
      Profile.prototype.save = jest.fn().mockResolvedValue(mockProfile);

      const req = { body: { name: "New Profile" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createProfile(req, res);

      expect(Profile.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Profile created successfully",
        profile: mockProfile,
      });
    });

    it("should handle errors and return a 500 status", async () => {
      const error = new Error("Database error");
      Profile.prototype.save = jest.fn().mockRejectedValue(error);

      const req = { body: { name: "New Profile" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createProfile(req, res);

      expect(Profile.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error creating profile",
        error,
      });
    });
  });
});
