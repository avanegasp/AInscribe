import 'dotenv/config';
import cors from "cors";
import express from "express";
import fetch from "node-fetch";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// console.log("TOKEN:", process.env.REPLICATE_API_TOKEN);
// console.log("TOKEN222222:", process.env.REPLICATE_API_TOKEN);

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware JSON
app.use(express.json());


// app.options("*", cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const predictionResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "6ed1ce77cdc8db65550e76d5ab82556d0cb31ac8ab3c4947b168a0bda7b962e4",
        input: { prompt: prompt }
      }),
    });

    const prediction = await predictionResponse.json();
    console.log("PREDICCIONNNN", prediction)

    if (prediction?.urls?.get) {
      
      // Polling hasta que la predicción termine
      let imageOutput = null;

      while (!imageOutput) {
        const pollRes = await fetch(prediction.urls.get, {
          headers: {
            Authorization: `Token ${REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        const pollData = await pollRes.json();

        if (pollData.status === "succeeded") {
          imageOutput = pollData.output;
          break;
        } else if (pollData.status === "failed") {
          throw new Error("La predicción falló.");
        }

        // Esperar 1 segundo antes del siguiente intento
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      res.json({ output: imageOutput });
    } else {
      throw new Error("No se pudo iniciar la predicción.");
    }

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
