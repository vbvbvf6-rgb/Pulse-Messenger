import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app";
import crypto from "node:crypto";

const router = Router();

interface QREntry {
  userId: number | null;
  status: "pending" | "confirmed";
  expiresAt: number;
}

const qrTokens = new Map<string, QREntry>();

setInterval(() => {
  const now = Date.now();
  for (const [id, entry] of qrTokens) {
    if (entry.expiresAt < now) qrTokens.delete(id);
  }
}, 60_000);

const SESSION_TTL = "30d";
const QR_TTL_MS = 5 * 60 * 1000;

router.post("/auth/qr/generate", (_req, res) => {
  const tokenId = crypto.randomBytes(24).toString("hex");
  const expiresAt = Date.now() + QR_TTL_MS;
  qrTokens.set(tokenId, { userId: null, status: "pending", expiresAt });
  res.json({ tokenId, expiresAt });
});

router.get("/auth/qr/:tokenId", async (req, res) => {
  const { tokenId } = req.params;
  const entry = qrTokens.get(tokenId);

  if (!entry || Date.now() > entry.expiresAt) {
    return res.json({ status: "expired" });
  }

  if (entry.status === "confirmed" && entry.userId) {
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, entry.userId) });
    if (!user) return res.json({ status: "expired" });
    const token = jwt.sign({ userId: entry.userId }, JWT_SECRET, { expiresIn: SESSION_TTL });
    qrTokens.delete(tokenId);
    return res.json({ status: "confirmed", token, userId: entry.userId, user });
  }

  return res.json({ status: "pending" });
});

router.post("/auth/qr/:tokenId/confirm", (req, res) => {
  const uid = req.currentUserId;
  if (!uid) return res.status(401).json({ error: "Требуется авторизация" });

  const { tokenId } = req.params;
  const entry = qrTokens.get(tokenId);

  if (!entry || entry.status !== "pending" || Date.now() > entry.expiresAt) {
    return res.status(404).json({ error: "QR-код недействителен или уже использован" });
  }

  entry.userId = uid;
  entry.status = "confirmed";
  res.json({ ok: true });
});

export default router;
