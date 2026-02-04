import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  type: text("type").notNull(), // 'job_apps', 'related_careers', 'suggest_major'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSearchSchema = createInsertSchema(searches).omit({ id: true, createdAt: true });
export type InsertSearch = z.infer<typeof insertSearchSchema>;
export type Search = typeof searches.$inferSelect;
