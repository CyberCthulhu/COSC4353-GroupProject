const mongoose = require("mongoose");
const {
  getNotificationsbyUser,
  getAllNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController");
const Notification = require("../models/notificationModel");

jest.mock("../models/notificationModel");

beforeAll(() => {
  jest.spyOn(mongoose.Types.ObjectId, "isValid").mockImplementation((id) => id === "validId");
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Notification Controller", () => {
  describe("getNotificationsbyUser", () => {
    it("should return notifications for a valid user ID", async () => {
      const req = { params: { userId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockNotifications = [
        { _id: "notif1", userId: "validId", isRead: false, message: "Notification 1" },
        { _id: "notif2", userId: "validId", isRead: false, message: "Notification 2" },
      ];

      Notification.find.mockResolvedValue(mockNotifications);

      await getNotificationsbyUser(req, res);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("validId");
      expect(Notification.find).toHaveBeenCalledWith({ userId: "validId", isRead: false });
      expect(res.json).toHaveBeenCalledWith(mockNotifications);
    });

    it("should return a 400 status for an invalid user ID", async () => {
      const req = { params: { userId: "invalidId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getNotificationsbyUser(req, res);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("invalidId");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid user ID format" });
    });

    it("should return a 500 status on database error", async () => {
      const req = { params: { userId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Notification.find.mockRejectedValue(new Error("Database error"));

      await getNotificationsbyUser(req, res);

      expect(Notification.find).toHaveBeenCalledWith({ userId: "validId", isRead: false });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching notifications",
        error: expect.any(Error),
      });
    });
  });

  describe("getAllNotifications", () => {
    it("should return all notifications", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockNotifications = [
        { _id: "notif1", userId: "validId", isRead: false, message: "Notification 1" },
        { _id: "notif2", userId: "validId", isRead: true, message: "Notification 2" },
      ];

      Notification.find.mockResolvedValue(mockNotifications);

      await getAllNotifications(req, res);

      expect(Notification.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockNotifications);
    });

    it("should return a 500 status on database error", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Notification.find.mockRejectedValue(new Error("Database error"));

      await getAllNotifications(req, res);

      expect(Notification.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching all notifications",
        error: expect.any(Error),
      });
    });
  });

  describe("markNotificationAsRead", () => {
    it("should mark a notification as read for a valid notification ID", async () => {
      const req = { params: { notificationId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockNotification = {
        _id: "validId",
        userId: "validId",
        isRead: false,
        message: "Notification 1",
        save: jest.fn().mockResolvedValue(),
      };

      Notification.findById.mockResolvedValue(mockNotification);

      await markNotificationAsRead(req, res);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("validId");
      expect(Notification.findById).toHaveBeenCalledWith("validId");
      expect(mockNotification.isRead).toBe(true);
      expect(mockNotification.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Notification marked as read" });
    });

    it("should return a 400 status for an invalid notification ID", async () => {
      const req = { params: { notificationId: "invalidId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await markNotificationAsRead(req, res);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("invalidId");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid notification ID format" });
    });

    it("should return a 404 status if notification is not found", async () => {
      const req = { params: { notificationId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Notification.findById.mockResolvedValue(null);

      await markNotificationAsRead(req, res);

      expect(Notification.findById).toHaveBeenCalledWith("validId");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Notification not found" });
    });

    it("should return a 500 status on database error", async () => {
      const req = { params: { notificationId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Notification.findById.mockRejectedValue(new Error("Database error"));

      await markNotificationAsRead(req, res);

      expect(Notification.findById).toHaveBeenCalledWith("validId");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error marking notification as read",
        error: expect.any(Error),
      });
    });
  });
});
