import { db } from "./db";
import { searches, type InsertSearch } from "@shared/schema";

export interface IStorage {
  logSearch(search: InsertSearch): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async logSearch(search: InsertSearch): Promise<void> {
    await db.insert(searches).values(search);
  }
}

export const storage = new DatabaseStorage();
