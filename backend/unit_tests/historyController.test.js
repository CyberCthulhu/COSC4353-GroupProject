const { getHistory } = require("../controllers/historyController");
const History = require("../models/historyModel");
const Event = require("../models/eventModel");

jest.mock("../models/historyModel");
jest.mock("../models/eventModel");

describe("History Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getHistory", () => {
    it("should return a list of events for the user's history", async () => {
      const req = { params: { userId: "user123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockHistory = {
        userId: "user123",
        eventIds: ["event1", "event2"],
      };

      const mockEvents = [
        { _id: "event1", title: "Event 1" },
        { _id: "event2", title: "Event 2" },
      ];

      History.findOne.mockResolvedValue(mockHistory);
      Event.find.mockResolvedValue(mockEvents);

      await getHistory(req, res);

      expect(History.findOne).toHaveBeenCalledWith({ userId: "user123" });
      expect(Event.find).toHaveBeenCalledWith({ _id: { $in: ["event1", "event2"] } });
      expect(res.json).toHaveBeenCalledWith(mockEvents);
    });

    it("should return a 404 status if no history is found", async () => {
      const req = { params: { userId: "user123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      History.findOne.mockResolvedValue(null);

      await getHistory(req, res);

      expect(History.findOne).toHaveBeenCalledWith({ userId: "user123" });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No events have been participated in" });
    });

    it("should return a 500 status if an error occurs", async () => {
      const req = { params: { userId: "user123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      History.findOne.mockRejectedValue(new Error("Database error"));

      await getHistory(req, res);

      expect(History.findOne).toHaveBeenCalledWith({ userId: "user123" });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error retrieving user history",
        error: expect.any(Error),
      });
    });
  });
});
