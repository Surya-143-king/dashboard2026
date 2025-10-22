import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, updateUserSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Get a single user
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Create a new user
  app.post("/api/users", async (req, res) => {
    try {
      const validationResult = insertUserSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const user = await storage.createUser(validationResult.data);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Update a user
  app.patch("/api/users/:id", async (req, res) => {
    try {
      const validationResult = updateUserSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const user = await storage.updateUser(req.params.id, validationResult.data);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Delete a user
  app.delete("/api/users/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
