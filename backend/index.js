import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).send("Prompt is required");
    }

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
  systemInstruction: `
You are a professional AI assistant.

Formatting Rules (strictly follow):
- NEVER use asterisks (* or **) for bullet points or bold text.
- NEVER use markdown symbols like #, ##, *, **, _, __, ~~ in your responses.
- Use plain numbered lists (1. 2. 3.) when listing items.
- Use plain dashes (-) sparingly for sub-points only if truly needed.
- Use CAPITALIZATION for emphasis instead of bold or italic markdown.
- For headings or sections, write them on their own line followed by a colon. Example:  Summary:
- Write in a clean, confident, professional tone.
- Be concise. Do not repeat the question. Do not over-explain.
- Structure responses naturally — like a senior professional would write them.
`
});

    const result = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of result.stream) {
  const text = chunk.text();
  const cleaned = text.replace(/\*+/g, ""); // strip asterisks
  if (cleaned && cleaned.trim() !== "") {
    res.write(cleaned);
  }
}

    res.end();

  } catch (error) {
    console.error("❌ Gemini Error:", error);
    res.status(500).send("AI processing failed.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Gemini server running on http://localhost:${PORT}`);
});