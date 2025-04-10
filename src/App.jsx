import { useEffect, useState } from "react";
import "./App.css";
import { GoogleGenAI } from "@google/genai";
import Replicate from "replicate";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
});

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

    setPrompt("");
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageUrl("");

    try {
      const output = await replicate.run(
        "stability-ai/sdxl:fd8b0d6c6cd356387c26ff8313ef6a8c9b6bfc9b547b9ee184b6dfd6b5b9f427",
        {
          input: {
            prompt: prompt,
          },
        }
      );

      setImageUrl(output[0]);
    } catch (error) {
      console.error("Error al generar imagen:", error);
      alert("Error al generar imagen.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToMedium = async () => {
    if (!response) return alert("No hay artículo para compartir.");
    try {
      await navigator.clipboard.writeText(response);
      alert(
        "Texto copiado al portapapeles. Se abrirá tu sesión de Medium en una nueva pestaña. Pega tu contenido ahí."
      );
      window.open("https://medium.com/new-story", "_blank");
    } catch (err) {
      alert("Error al copiar el texto.");
    }
  };

  useEffect(() => {}, [response, prompt]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">AInscribe</h1>

      <div className="d-flex" style={{ gap: "20px" }}>
        {/* Resultado (70%) */}
        <div style={{ width: "70%" }}>
          <div
            className="border p-3 rounded bg-light"
            style={{ minHeight: "362px" }}
          >
            <p className="mb-0 text-muted">
              {loading
                ? "Cargando..."
                : response || "Generated article will appear here..."}
            </p>

            {imageUrl && (
              <div className="mt-3 text-center">
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(imageUrl);
                      alert("URL copiada al portapapeles");
                    }}
                  >
                    🔗 Copiar URL de imagen
                  </button>
                  <button
                    className="btn btn-outline-primary ms-2"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = imageUrl;
                      link.download = "imagen-generada.png";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    ⬇️ Descargar imagen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input y botones (30%) */}
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

          <div className="d-grid mt-2">
            <button
              className="btn btn-outline-success"
              onClick={handleGenerateImage}
              disabled={loading}
            >
              🖼️ Generar imagen
            </button>
          </div>
        </div>
      </div>

      {/* Botón de publicar en Medium */}
      <div className="mt-4">
        <button
          className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
          onClick={handlePublishToMedium}
        >
          <i className="fab fa-medium-m me-2"></i> Publicar en Medium
        </button>
      </div>
    </div>
  );
}

export default App;
