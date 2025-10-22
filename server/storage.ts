import { type User, type InsertUser, type UpdateUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getAllUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: UpdateUser): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
    this.seedData();
  }

  private seedData() {
    // Add some sample users
    const sampleUsers: InsertUser[] = [
      {
        firstName: "Dave",
        lastName: "Richards",
        email: "dave@mail.com",
        phone: "8332883854",
        yearOfBirth: "1990",
        gender: "male",
        alternatePhone: "9876543210",
        address: "123 Main Street, Apartment 4B",
        pincode: "400001",
        domicileState: "maharashtra",
        domicileCountry: "india",
        school: "Lincoln College",
        degree: "Bachelors in Technology",
        course: "Computer Science Engineering",
        yearOfCompletion: "2012",
        grade: "A",
        skills: "JavaScript, React, Node.js, TypeScript",
        projects: "E-commerce platform, Social media dashboard",
        workExperience: JSON.stringify([
          { domain: "Technology", subdomain: "MERN Stack", experience: "3-5" },
        ]),
        linkedIn: "linkedin.com/in/daverichards",
        resume: "myresume.pdf",
      },
      {
        firstName: "Abhishek",
        lastName: "Hari",
        email: "hari@mail.com",
        phone: "9876543210",
      },
      {
        firstName: "Nishta",
        lastName: "Gupta",
        email: "nishta@mail.com",
        phone: "8765432109",
      },
    ];

    sampleUsers.forEach((user) => {
      const id = randomUUID();
      this.users.set(id, { ...user, id });
    });
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updateUser: UpdateUser): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return undefined;
    }
    
    const updatedUser: User = {
      ...existingUser,
      ...updateUser,
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}

export const storage = new MemStorage();
