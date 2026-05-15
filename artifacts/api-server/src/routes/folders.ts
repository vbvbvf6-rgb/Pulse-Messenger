import { Router } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/folders", async (req, res) => {
  try {
    const uid = req.currentUserId;
    const rows = await db.execute(sql`
      SELECT id, name, icon, sort_order
      FROM chat_folders
      WHERE user_id = ${uid}
      ORDER BY sort_order ASC, id ASC
    `);
    res.json((rows.rows as any[]).map(r => ({
      id: r.id,
      name: r.name,
      icon: r.icon,
      sortOrder: r.sort_order,
    })));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.post("/folders", async (req, res) => {
  try {
    const uid = req.currentUserId;
    const { name, icon } = req.body;
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Укажите название папки" });
    }
    const safeName = name.trim().slice(0, 50);
    const safeIcon = (icon && typeof icon === "string") ? icon.slice(0, 8) : "📁";
    const result = await db.execute(sql`
      INSERT INTO chat_folders (user_id, name, icon, sort_order)
      VALUES (${uid}, ${safeName}, ${safeIcon}, (
        SELECT COALESCE(MAX(sort_order), 0) + 1 FROM chat_folders WHERE user_id = ${uid}
      ))
      RETURNING id, name, icon, sort_order
    `);
    const f = result.rows[0] as any;
    res.status(201).json({ id: f.id, name: f.name, icon: f.icon, sortOrder: f.sort_order });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.patch("/folders/:id", async (req, res) => {
  try {
    const uid = req.currentUserId;
    const folderId = Number(req.params.id);
    if (!folderId) return res.status(400).json({ error: "Неверный ID" });
    const { name, icon } = req.body;
    await db.execute(sql`
      UPDATE chat_folders SET
        name = CASE WHEN ${name ? name.trim().slice(0, 50) : null}::text IS NOT NULL
                    THEN ${name ? name.trim().slice(0, 50) : null} ELSE name END,
        icon = CASE WHEN ${icon ? icon.slice(0, 8) : null}::text IS NOT NULL
                    THEN ${icon ? icon.slice(0, 8) : null} ELSE icon END
      WHERE id = ${folderId} AND user_id = ${uid}
    `);
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/folders/:id", async (req, res) => {
  try {
    const uid = req.currentUserId;
    const folderId = Number(req.params.id);
    if (!folderId) return res.status(400).json({ error: "Неверный ID" });
    await db.execute(sql`DELETE FROM chat_folder_chats WHERE folder_id = ${folderId}`);
    await db.execute(sql`DELETE FROM chat_folders WHERE id = ${folderId} AND user_id = ${uid}`);
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/folders/:id/chats", async (req, res) => {
  try {
    const uid = req.currentUserId;
    const folderId = Number(req.params.id);
    const check = await db.execute(sql`SELECT id FROM chat_folders WHERE id = ${folderId} AND user_id = ${uid} LIMIT 1`);
    if (!(check.rows as any[]).length) return res.status(404).json({ error: "Папка не найдена" });
    const rows = await db.execute(sql`SELECT chat_id FROM chat_folder_chats WHERE folder_id = ${folderId}`);
    res.json((rows.rows as any[]).map(r => r.chat_id));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.post("/folders/:id/chats", async (req, res) => {
  try {
    const uid = req.currentUserId;
    const folderId = Number(req.params.id);
    const chatId = Number(req.body.chatId);
    if (!chatId) return res.status(400).json({ error: "chatId обязателен" });
    const check = await db.execute(sql`SELECT id FROM chat_folders WHERE id = ${folderId} AND user_id = ${uid} LIMIT 1`);
    if (!(check.rows as any[]).length) return res.status(404).json({ error: "Папка не найдена" });
    await db.execute(sql`
      INSERT INTO chat_folder_chats (folder_id, chat_id) VALUES (${folderId}, ${chatId})
      ON CONFLICT DO NOTHING
    `);
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/folders/:id/chats/:chatId", async (req, res) => {
  try {
    const uid = req.currentUserId;
    const folderId = Number(req.params.id);
    const chatId = Number(req.params.chatId);
    const check = await db.execute(sql`SELECT id FROM chat_folders WHERE id = ${folderId} AND user_id = ${uid} LIMIT 1`);
    if (!(check.rows as any[]).length) return res.status(404).json({ error: "Папка не найдена" });
    await db.execute(sql`DELETE FROM chat_folder_chats WHERE folder_id = ${folderId} AND chat_id = ${chatId}`);
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
