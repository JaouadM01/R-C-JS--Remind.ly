import { z } from "zod";

export const ReminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"), // ISO date string
  description: z.string().optional(),
});

export type ReminderSchemaType = z.infer<typeof ReminderSchema>;
