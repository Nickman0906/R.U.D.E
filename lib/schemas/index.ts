import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().default(""),
  dueDate: z.string(),
  priority: z.enum(["low", "med", "high"]),
  status: z.enum(["todo", "done"]),
  tags: z.array(z.string()).default([])
});

export const eventSchema = z.object({
  title: z.string().min(2),
  startDateTime: z.string(),
  endDateTime: z.string(),
  location: z.string().default(""),
  notes: z.string().default("")
});

export const habitSchema = z.object({
  name: z.string().min(2),
  frequency: z.enum(["daily", "weekly", "custom"]),
  targetPerPeriod: z.number().min(1),
  reminderTime: z.string().optional()
});

export const financeSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive(),
  category: z.string().min(2),
  date: z.string(),
  description: z.string().default("")
});
