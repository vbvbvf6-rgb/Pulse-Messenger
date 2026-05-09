import app from "./app";
import { logger } from "./lib/logger";
import { runSeed } from "./seed";
import { db, messagesTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { broadcastToChat } from "./lib/sse";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

runSeed().catch((err) => logger.error({ err }, "Seed failed"));

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});

setInterval(async () => {
  try {
    const rows = await db.execute(sql`SELECT * FROM scheduled_messages WHERE scheduled_at <= NOW()`);
    for (const msg of rows.rows as any[]) {
      const [inserted] = await db.insert(messagesTable).values({
        chatId: msg.chat_id,
        senderId: msg.sender_id,
        text: msg.text,
        type: "text",
      }).returning();
      broadcastToChat(msg.chat_id, "new-message", { messageId: inserted.id, chatId: msg.chat_id });
      await db.execute(sql`DELETE FROM scheduled_messages WHERE id = ${msg.id}`);
    }
  } catch (err) {
    logger.warn({ err }, "Scheduled messages processor error");
  }
}, 30_000);
