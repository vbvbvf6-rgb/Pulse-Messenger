import { Router } from "express";
import { db, platformEventsTable } from "@workspace/db";
import { eq, desc, and, lte, gte, or, isNull } from "drizzle-orm";

const router = Router();

router.get("/platform-events", async (req, res) => {
  try {
    const now = new Date();
    const events = await db
      .select()
      .from(platformEventsTable)
      .where(
        and(
          eq(platformEventsTable.isActive, true),
          or(
            isNull(platformEventsTable.startAt),
            lte(platformEventsTable.startAt, now)
          ),
          or(
            isNull(platformEventsTable.endAt),
            gte(platformEventsTable.endAt, now)
          )
        )
      )
      .orderBy(desc(platformEventsTable.createdAt));
    res.json(events);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/admin/platform-events", async (req, res) => {
  try {
    if (!(req as any).isAdmin) return res.status(403).json({ error: "Forbidden" });
    const events = await db
      .select()
      .from(platformEventsTable)
      .orderBy(desc(platformEventsTable.createdAt));
    res.json(events);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin/platform-events", async (req, res) => {
  try {
    if (!(req as any).isAdmin) return res.status(403).json({ error: "Forbidden" });
    const { title, description, imageUrl, bannerColor, startAt, endAt, isActive } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: "Заголовок обязателен" });

    const [event] = await db.insert(platformEventsTable).values({
      title: title.trim(),
      description: description?.trim() || null,
      imageUrl: imageUrl?.trim() || null,
      bannerColor: bannerColor || "#7c3aed",
      startAt: startAt ? new Date(startAt) : null,
      endAt: endAt ? new Date(endAt) : null,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      createdBy: req.currentUserId,
    }).returning();
    res.status(201).json(event);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/admin/platform-events/:id", async (req, res) => {
  try {
    if (!(req as any).isAdmin) return res.status(403).json({ error: "Forbidden" });
    const id = Number(req.params.id);
    const { title, description, imageUrl, bannerColor, startAt, endAt, isActive } = req.body;

    const updates: Record<string, any> = { updatedAt: new Date() };
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description?.trim() || null;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl?.trim() || null;
    if (bannerColor !== undefined) updates.bannerColor = bannerColor;
    if (startAt !== undefined) updates.startAt = startAt ? new Date(startAt) : null;
    if (endAt !== undefined) updates.endAt = endAt ? new Date(endAt) : null;
    if (isActive !== undefined) updates.isActive = Boolean(isActive);

    const [event] = await db.update(platformEventsTable).set(updates).where(eq(platformEventsTable.id, id)).returning();
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/admin/platform-events/:id", async (req, res) => {
  try {
    if (!(req as any).isAdmin) return res.status(403).json({ error: "Forbidden" });
    const id = Number(req.params.id);
    await db.delete(platformEventsTable).where(eq(platformEventsTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
