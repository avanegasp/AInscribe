import { useEffect, useState } from "react";
import "./App.css";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("Generando artículo...");

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(text);
    } catch (error) {
      console.error("Error al generar:", error);
      setResponse("Error al generar el artículo.");
    } finally {
      setLoading(false);
    }

    setPrompt("")
  };

  useEffect(() => {
  }, [response, prompt]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">AInscribe</h1>

      <div className="d-flex" style={{ gap: "20px" }}>
        {/* Resultado (70%) */}
        <div style={{ width: "70%" }}>
          <div
            className="border p-3 rounded bg-light"
            style={{ minHeight: "300px" }}
          >
            <p className="mb-0 text-muted">
              {loading ? "Cargando..." : response || "Generated article will appear here..."}
            </p>
          </div>
        </div>

        {/* Input y botón (30%) */}
        <div style={{ width: "30%" }}>
          <div className="mb-3">
            <label htmlFor="inputPrompt" className="form-label">
              Write your idea
            </label>
            <textarea
              id="inputPrompt"
              className="form-control"
              rows="8"
              placeholder="Escribe tu idea acá"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>

          <div className="d-grid">
            <button
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generando..." : "Generate article"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


