const { generateUsersEventsReport } = require("../controllers/reportController");
const User = require("../models/userAuthModel");
const History = require("../models/historyModel");
const Profile = require("../models/profilesModel");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

jest.mock("../models/userAuthModel");
jest.mock("../models/historyModel");
jest.mock("../models/profilesModel");
jest.mock("csv-writer");

describe("Report Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("generateUsersEventsReport", () => {
    it("should generate a CSV file and send it for download", async () => {
      const req = {};
      const res = {
        download: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUsers = [
        { _id: "user1", name: "User One" },
        { _id: "user2", name: "User Two" },
      ];

      const mockHistories = [
        {
          userId: "user1",
          eventIds: [
            { _id: "event1", title: "Event One" },
            { _id: "event2", title: "Event Two" },
          ],
        },
        {
          userId: "user2",
          eventIds: [],
        },
      ];

      const mockProfiles = [
        { userId: "user1", fullName: "User One FullName" },
        { userId: "user2", fullName: "User Two FullName" },
      ];

      const mockCsvWriter = {
        writeRecords: jest.fn().mockResolvedValue(),
      };

      User.find.mockResolvedValue(mockUsers);

      History.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockHistories),
      });

      Profile.find.mockResolvedValue(mockProfiles);
      createCsvWriter.mockReturnValue(mockCsvWriter);

      await generateUsersEventsReport(req, res);

      const expectedData = [
        {
          fullName: "User One FullName",
          events: "Event One, Event Two",
        },
        {
          fullName: "User Two FullName",
          events: "",
        },
      ];

      expect(User.find).toHaveBeenCalled();
      expect(History.find).toHaveBeenCalled();
      expect(Profile.find).toHaveBeenCalled();
      expect(createCsvWriter).toHaveBeenCalledWith({
        path: "users_events_report.csv",
        header: [
          { id: "fullName", title: "Full Name" },
          { id: "events", title: "Events" },
        ],
      });
      expect(mockCsvWriter.writeRecords).toHaveBeenCalledWith(expectedData);
      expect(res.download).toHaveBeenCalledWith("users_events_report.csv");
    });

    it("should return a 500 status if an error occurs", async () => {
      const req = {};
      const res = {
        download: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.find.mockRejectedValue(new Error("Database error"));

      await generateUsersEventsReport(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error generating CSV report",
        error: expect.any(Error),
      });
    });
  });
});
