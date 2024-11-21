const { signUpForEvent, getAllSignups } = require("../controllers/signUpController");
const SignUp = require("../models/signUpModel");
const httpMocks = require("node-mocks-http");

jest.mock("../models/signUpModel");

describe("SignUp Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signUpForEvent", () => {
    it("should return 400 if the user is already signed up for the event", async () => {
      const req = httpMocks.createRequest({
        body: {
          userId: "user123",
          eventId: "event456",
        },
      });
      const res = httpMocks.createResponse();

      SignUp.findOne.mockResolvedValue({ userId: "user123", eventId: "event456" });

      await signUpForEvent(req, res);

      expect(SignUp.findOne).toHaveBeenCalledWith({ userId: "user123", eventId: "event456" });
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: "User is already signed up for the event" });
    });

    it("should create a new sign-up and return 201", async () => {
      const req = httpMocks.createRequest({
        body: {
          userId: "user123",
          eventId: "event456",
        },
      });
      const res = httpMocks.createResponse();

      SignUp.findOne.mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue({ userId: "user123", eventId: "event456" });
      SignUp.mockImplementation(() => ({ save: saveMock }));

      await signUpForEvent(req, res);

      expect(SignUp.findOne).toHaveBeenCalledWith({ userId: "user123", eventId: "event456" });
      expect(saveMock).toHaveBeenCalled();
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: "Successfully signed up for the event",
        signUp: { userId: "user123", eventId: "event456" },
      });
    });

    it("should return 500 if there is an error during sign-up", async () => {
      const req = httpMocks.createRequest({
        body: {
          userId: "user123",
          eventId: "event456",
        },
      });
      const res = httpMocks.createResponse();

      SignUp.findOne.mockRejectedValue(new Error("Database error"));

      await signUpForEvent(req, res);

      expect(SignUp.findOne).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        message: "Error signing up for event",
        error: expect.any(Object),
      });
    });
  });

  describe("getAllSignups", () => {
    it("should return 200 with all sign-ups", async () => {
      const signUpsMock = [
        { userId: { name: "User1" }, eventId: { title: "Event1" } },
        { userId: { name: "User2" }, eventId: { title: "Event2" } },
      ];
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      SignUp.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(signUpsMock),
      });

      await getAllSignups(req, res);

      expect(SignUp.find).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(signUpsMock);
    });

    it("should return 404 if no sign-ups are found", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      SignUp.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      });

      await getAllSignups(req, res);

      expect(SignUp.find).toHaveBeenCalled();
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: "No sign-ups found" });
    });

    it("should return 500 if there is an error fetching sign-ups", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      SignUp.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      await getAllSignups(req, res);

      expect(SignUp.find).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        message: "Error fetching sign-ups",
        error: expect.any(Object),
      });
    });
  });
});
