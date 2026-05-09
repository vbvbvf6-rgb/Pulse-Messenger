import { pgTable, serial, integer, text, timestamp, unique } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const userDailyBonusTable = pgTable("user_daily_bonus", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  bonusDate: text("bonus_date").notNull(),
  claimedAt: timestamp("claimed_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  uniq: unique("user_daily_bonus_user_date").on(t.userId, t.bonusDate),
}));
