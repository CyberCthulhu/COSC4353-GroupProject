const mongoose = require("mongoose");
const {
  getEvents,
  getEventById,
  createNewEvent,
  deleteEventById,
  updateEventById,
} = require("../controllers/eventController");
const Event = require("../models/eventModel");

jest.mock("../models/eventModel");

beforeAll(() => {
  jest.spyOn(mongoose.Types.ObjectId, "isValid").mockImplementation((id) => id === "validId");
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Event Controller", () => {
  describe("getEvents", () => {
    it("should return all events with a 200 status", async () => {
      const mockEvents = [
        { _id: "1", title: "Event 1" },
        { _id: "2", title: "Event 2" },
      ];
      Event.find.mockResolvedValue(mockEvents);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEvents(req, res);

      expect(Event.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockEvents);
    });

    it("should return a 500 status on database error", async () => {
      Event.find.mockRejectedValue(new Error("Database error"));

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving events", error: expect.any(Error) });
    });
  });

  describe("getEventById", () => {
    it("should return an event by ID with a 200 status", async () => {
      const mockEvent = { _id: "validId", title: "Event 1" };
      Event.findById.mockResolvedValue(mockEvent);

      const req = { params: { eventId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEventById(req, res);

      expect(Event.findById).toHaveBeenCalledWith("validId");
      expect(res.json).toHaveBeenCalledWith(mockEvent);
    });

    it("should return a 400 status for invalid ID format", async () => {
      const req = { params: { eventId: "invalidId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid event ID format" });
    });

    it("should return a 404 status if event is not found", async () => {
      Event.findById.mockResolvedValue(null);

      const req = { params: { eventId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Event not found" });
    });

    it("should return a 500 status on database error", async () => {
      Event.findById.mockRejectedValue(new Error("Database error"));

      const req = { params: { eventId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving event", error: expect.any(Error) });
    });
  });

  describe("createNewEvent", () => {
    it("should create a new event and return it with a 201 status", async () => {
        const mockEvent = {
          _id: "1",
          title: "New Event",
          requiredSkills: "Skill 1",
          location: "Location 1",
          description: "Description 1",
          date: "2023-01-01",
          urgency: "High",
          zipCode: "12345",
        };
      
        Event.mockImplementation(() => ({
          save: jest.fn().mockResolvedValue(mockEvent),
        }));
      
        const req = { body: mockEvent };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
      
        await createNewEvent(req, res);
      
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockEvent);
      });      

    it("should return a 400 status if required fields are missing", async () => {
      const req = { body: {} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await createNewEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
    });

    it("should return a 500 status on database error", async () => {
      Event.prototype.save = jest.fn().mockRejectedValue(new Error("Database error"));

      const req = {
        body: {
          title: "New Event",
          requiredSkills: "Skill 1",
          location: "Location 1",
          description: "Description 1",
          date: "2023-01-01",
          urgency: "High",
          zipCode: "12345",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await createNewEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error creating event", error: expect.any(Error) });
    });
  });

  describe("deleteEventById", () => {
    it("should delete an event and return a 200 status", async () => {
      Event.findByIdAndDelete.mockResolvedValue({ _id: "validId", title: "Event 1" });

      const req = { params: { eventId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await deleteEventById(req, res);

      expect(Event.findByIdAndDelete).toHaveBeenCalledWith("validId");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Event deleted successfully" });
    });

    it("should return a 404 status if event is not found", async () => {
      Event.findByIdAndDelete.mockResolvedValue(null);

      const req = { params: { eventId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await deleteEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Event not found" });
    });

    it("should return a 500 status on database error", async () => {
      Event.findByIdAndDelete.mockRejectedValue(new Error("Database error"));

      const req = { params: { eventId: "validId" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await deleteEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error deleting event", error: expect.any(Error) });
    });
  });

  describe("updateEventById", () => {
    it("should update an event and return it with a 200 status", async () => {
      const mockEvent = { _id: "validId", title: "Updated Event" };
      Event.findByIdAndUpdate.mockResolvedValue(mockEvent);

      const req = {
        params: { eventId: "validId" },
        body: {
          title: "Updated Event",
          requiredSkills: "Updated Skill",
          location: "Updated Location",
          description: "Updated Description",
          date: "2023-01-02",
          urgency: "Low",
          zipCode: "54321",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await updateEventById(req, res);

      expect(Event.findByIdAndUpdate).toHaveBeenCalledWith(
        "validId",
        {
          title: "Updated Event",
          requiredSkills: "Updated Skill",
          location: "Updated Location",
          description: "Updated Description",
          date: "2023-01-02",
          urgency: "Low",
          zipCode: "54321",
        },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockEvent);
    });

    it("should return a 404 status if event is not found", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true); // Ensure valid ID
        Event.findByIdAndUpdate.mockResolvedValue(null); // Simulate no event found
      
        const req = {
          params: { eventId: "validId" },
          body: { title: "Updated Event" },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
      
        await updateEventById(req, res);
      
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Event not found" });
      });
      

      it("should return a 500 status on database error", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true); // Ensure valid ID
        Event.findByIdAndUpdate.mockRejectedValue(new Error("Database error")); // Simulate error
      
        const req = {
          params: { eventId: "validId" },
          body: { title: "Updated Event" },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
      
        await updateEventById(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Error updating event",
          error: expect.any(Error),
        });
      });      
  });
});
