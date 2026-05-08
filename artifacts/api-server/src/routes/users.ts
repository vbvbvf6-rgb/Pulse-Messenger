import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq, like, or } from "drizzle-orm";
import { UpdateMeBody } from "@workspace/api-zod";

const router = Router();

router.get("/users/me", async (req, res) => {
  try {
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, 1) });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/me", async (req, res) => {
  try {
    const body = UpdateMeBody.parse(req.body);
    const [updated] = await db.update(usersTable).set(body).where(eq(usersTable.id, 1)).returning();
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/search", async (req, res) => {
  try {
    const q = String(req.query.q || "");
    const users = await db.select().from(usersTable).where(
      or(
        like(usersTable.username, `%${q}%`),
        like(usersTable.displayName, `%${q}%`)
      )
    ).limit(20);
    res.json(users);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, userId) });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats/me", async (req, res) => {
  try {
    const { messagesTable, callsTable, giftsTable, chatsTable, chatMembersTable, contactsTable } = await import("@workspace/db");
    const { count, sum } = await import("drizzle-orm");

    const [msgCount] = await db.select({ count: count() }).from(messagesTable).where(eq(messagesTable.senderId, 1));
    const [callCount] = await db.select({ count: count() }).from(callsTable).where(eq(callsTable.callerId, 1));
    const [callDuration] = await db.select({ total: sum(callsTable.durationSeconds) }).from(callsTable).where(eq(callsTable.callerId, 1));
    const [giftsSent] = await db.select({ count: count() }).from(giftsTable).where(eq(giftsTable.senderId, 1));
    const [giftsReceived] = await db.select({ count: count() }).from(giftsTable).where(eq(giftsTable.receiverId, 1));
    const [chatsCount] = await db.select({ count: count() }).from(chatMembersTable).where(eq(chatMembersTable.userId, 1));
    const [contactsCount] = await db.select({ count: count() }).from(contactsTable).where(eq(contactsTable.userId, 1));

    res.json({
      messagesSent: Number(msgCount?.count ?? 0),
      callsMade: Number(callCount?.count ?? 0),
      callDurationSeconds: Number(callDuration?.total ?? 0),
      giftsSent: Number(giftsSent?.count ?? 0),
      giftsReceived: Number(giftsReceived?.count ?? 0),
      chatsCount: Number(chatsCount?.count ?? 0),
      contactsCount: Number(contactsCount?.count ?? 0),
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
