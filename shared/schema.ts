import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Basic Info
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  yearOfBirth: text("year_of_birth"),
  gender: text("gender"),
  phone: text("phone"),
  alternatePhone: text("alternate_phone"),
  address: text("address"),
  pincode: text("pincode"),
  domicileState: text("domicile_state"),
  domicileCountry: text("domicile_country"),
  
  // Education & Skills
  school: text("school"),
  degree: text("degree"),
  course: text("course"),
  yearOfCompletion: text("year_of_completion"),
  grade: text("grade"),
  skills: text("skills"),
  projects: text("projects"),
  
  // Experience
  workExperience: text("work_experience"), // JSON stringified array
  linkedIn: text("linkedin"),
  resume: text("resume"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const updateUserSchema = createInsertSchema(users).omit({
  id: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;

// Work experience type
export type WorkExperience = {
  domain: string;
  subdomain: string;
  experience: string;
};
