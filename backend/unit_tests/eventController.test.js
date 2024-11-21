const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const eventController = require("../controllers/eventController"); // Adjust path if needed
const { createNewEvent } = require("../controllers/eventController");

jest.mock("../models/eventModel");

describe("Event Controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
    };

    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    jest.clearAllMocks();
  });

  describe("getEvents", () => {
    it("should return all events", async () => {
      const events = [{ title: "Event 1" }, { title: "Event 2" }];
      Event.find.mockResolvedValue(events);

      await eventController.getEvents(mockReq, mockRes);

      expect(Event.find).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(events);
    });

    it("should handle errors", async () => {
      Event.find.mockRejectedValue(new Error("Database error"));

      await eventController.getEvents(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error retrieving events",
        error: expect.any(Error),
      });
    });
  });

  describe("getEventById", () => {
    it("should return an event by ID", async () => {
      const event = { title: "Event 1" };
      mockReq.params.eventId = "validEventId";
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findById.mockResolvedValue(event);

      await eventController.getEventById(mockReq, mockRes);

      expect(Event.findById).toHaveBeenCalledWith("validEventId");
      expect(mockRes.json).toHaveBeenCalledWith(event);
    });

    it("should return 400 for invalid ID format", async () => {
      mockReq.params.eventId = "invalidId";
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

      await eventController.getEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Invalid event ID format",
      });
    });

    it("should return 404 if event not found", async () => {
      mockReq.params.eventId = "validEventId";
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findById.mockResolvedValue(null);

      await eventController.getEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Event not found",
      });
    });

    it("should handle errors", async () => {
      mockReq.params.eventId = "validEventId";
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findById.mockRejectedValue(new Error("Database error"));

      await eventController.getEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error retrieving event",
        error: expect.any(Error),
      });
    });
  });

  describe("createNewEvent", () => {
    it("should create a new event", async () => {
        const newEvent = {
          _id: "1",
          title: "New Event",
          requiredSkills: "Skill 1",
          location: "Location 1",
          description: "Description 1",
          date: "2023-01-01",
          urgency: "High",
          zipCode: "12345",
        };
  
        mockReq.body = {
          title: "New Event",
          requiredSkills: "Skill 1",
          location: "Location 1",
          description: "Description 1",
          date: "2023-01-01",
          urgency: "High",
          zipCode: "12345",
        };
  
        Event.mockImplementation(() => ({
          save: jest.fn().mockResolvedValue(newEvent),
        }));
  
        await createNewEvent(mockReq, mockRes);
  
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(newEvent);
      });
  
      it("should handle errors", async () => {
        mockReq.body = {
          title: "New Event",
          requiredSkills: "Skill 1",
          location: "Location 1",
          description: "Description 1",
          date: "2023-01-01",
          urgency: "High",
          zipCode: "12345",
        };
  
        Event.mockImplementation(() => ({
          save: jest.fn().mockRejectedValue(new Error("Database error")),
        }));
  
        await createNewEvent(mockReq, mockRes);
  
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: "Error creating event",
          error: expect.any(Error),
        });
      });
    });

  describe("deleteEventById", () => {
    it("should delete an event by ID", async () => {
      const eventId = "validEventId";
      mockReq.params.eventId = eventId;
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findByIdAndDelete.mockResolvedValue({ title: "Deleted Event" });

      await eventController.deleteEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Event deleted successfully",
      });
    });

    it("should return 400 for invalid ID format", async () => {
      mockReq.params.eventId = "invalidId";
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

      await eventController.deleteEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Invalid event ID format",
      });
    });

    it("should return 404 if event not found", async () => {
      const eventId = "validEventId";
      mockReq.params.eventId = eventId;
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findByIdAndDelete.mockResolvedValue(null);

      await eventController.deleteEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Event not found",
      });
    });

    it("should handle errors", async () => {
      const eventId = "validEventId";
      mockReq.params.eventId = eventId;
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findByIdAndDelete.mockRejectedValue(new Error("Database error"));

      await eventController.deleteEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error deleting event",
        error: expect.any(Error),
      });
    });
  });

  describe("updateEventById", () => {
    it("should update an event by ID", async () => {
      const updatedEvent = { title: "Updated Event" };
      const eventId = "validEventId";
      mockReq.params.eventId = eventId;
      mockReq.body = { ...updatedEvent, requiredSkills: "skills", location: "location", date: "date", urgency: "high", zipCode: "12345" };
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findByIdAndUpdate.mockResolvedValue(updatedEvent);

      await eventController.updateEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedEvent);
    });

    it("should return 400 for missing fields", async () => {
      mockReq.body = {};
      mockReq.params.eventId = "validEventId";
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);

      await eventController.updateEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "All fields are required",
      });
    });

    it("should return 404 if event not found", async () => {
      mockReq.params.eventId = "validEventId";
      mockReq.body = { title: "Updated Event", requiredSkills: "skills", location: "location", date: "date", urgency: "high", zipCode: "12345" };
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findByIdAndUpdate.mockResolvedValue(null);

      await eventController.updateEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Event not found",
      });
    });

    it("should handle errors", async () => {
      const eventId = "validEventId";
      mockReq.params.eventId = eventId;
      mockReq.body = { title: "Updated Event", requiredSkills: "skills", location: "location", date: "date", urgency: "high", zipCode: "12345" };
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Event.findByIdAndUpdate.mockRejectedValue(new Error("Database error"));

      await eventController.updateEventById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error updating event",
        error: expect.any(Error),
      });
    });
  });
});
