import { Router } from "express";

const router = Router();

async function callPollinations(prompt: string): Promise<string | null> {
  try {
    const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&seed=${Math.floor(Math.random() * 99999)}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!r.ok) return null;
    const text = await r.text();
    return text?.trim() || null;
  } catch {
    return null;
  }
}

router.post("/ai/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text || !targetLang) {
      return res.status(400).json({ error: "text и targetLang обязательны" });
    }
    if (String(text).length > 2000) {
      return res.status(400).json({ error: "Текст слишком длинный" });
    }

    const langNames: Record<string, string> = {
      ru: "Russian", en: "English", es: "Spanish", fr: "French",
      de: "German", it: "Italian", pt: "Portuguese", zh: "Chinese",
      ja: "Japanese", ko: "Korean", ar: "Arabic", tr: "Turkish",
      pl: "Polish", nl: "Dutch", uk: "Ukrainian",
    };

    const langName = langNames[targetLang] || targetLang;
    const prompt = `Translate the following text to ${langName}. Output ONLY the translation, no explanations, no quotes:\n\n${text}`;

    const translated = await callPollinations(prompt);
    if (!translated) {
      return res.status(503).json({ error: "Сервис перевода недоступен" });
    }

    res.json({ original: text, translated, targetLang });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/ai/smart-replies", async (req, res) => {
  try {
    const { lastMessage, chatContext } = req.body;
    if (!lastMessage) {
      return res.status(400).json({ error: "lastMessage обязателен" });
    }

    const context = chatContext || lastMessage;
    const prompt = `Ты — помощник для мессенджера. Сгенерируй ровно 3 коротких варианта ответа на это сообщение: "${String(context).slice(0, 300)}"\n\nПравила:\n- Каждый вариант — 1-8 слов\n- Отвечай на русском языке по умолчанию. Если сообщение явно на другом языке — используй его\n- Варианты должны быть разными: позитивный, нейтральный, вопрос\n- Выведи ТОЛЬКО JSON-массив из 3 строк, ничего больше\n- Пример: ["Хорошо!", "Расскажи подробнее", "Когда?"]\n\nJSON-массив:`;

    const result = await callPollinations(prompt);
    if (!result) {
      return res.json({ suggestions: ["👍", "Хорошо", "Понял(а)"] });
    }

    try {
      const jsonMatch = result.match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return res.json({ suggestions: parsed.slice(0, 3).map((s: any) => String(s)) });
        }
      }
    } catch {}

    res.json({ suggestions: ["👍", "Хорошо", "Понял(а)"] });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
