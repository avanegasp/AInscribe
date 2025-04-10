import 'dotenv/config';
import cors from "cors";
import express from "express";
import fetch from "node-fetch";

console.log("TOKEN:", process.env.REPLICATE_API_TOKEN);
console.log("TOKEN222222:", process.env.REPLICATE_API_TOKEN);

const app = express();

// CORS
app.use(cors({
  origin: "https://localhost:5173", // el puerto de tu frontend
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

// Middleware JSON
app.use(express.json());

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.post("/generate-image", async (req, res) => {
  console.log("🚀 Recibido POST /generate-image");
  const { prompt } = req.body;
  console.log("Prompt recibido:", prompt);

  try {
    console.log("🧪 Enviando a Replicate:", {
      prompt,
      token: REPLICATE_API_TOKEN,
    });

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "fd8b0d6c6cd356387c26ff8313ef6a8c9b6bfc9b547b9ee184b6dfd6b5b9f427",
        input: { prompt },
      }),
    });

    const data = await response.json();
    console.log("Respuesta de Replicate:", data);
    res.json(data);
  } catch (error) {
    console.error("❌ Error al comunicar con Replicate:", error.message);
    if (error.response) {
      console.error("📦 Error response status:", error.response.status);
      const text = await error.response.text();
      console.error("📦 Error response data:", text);
    }
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
