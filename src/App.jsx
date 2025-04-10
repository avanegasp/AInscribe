import { useEffect, useState } from "react";
import "./App.css";
import ButtonMedium from "./ButtonMedium";
import ButtonGenerateArticle from "./ButtonGenerateArticle";
import ButtonGenerateImage from "./ButtonGenerateImage";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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
                : response || "El artículo generado aparecerá aquí..."}
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
            <ButtonGenerateArticle
            loading={loading}
            setResponse={setResponse}
            setLoading={setLoading}
            prompt={prompt}
          />
          </div>

          <div className="d-grid mt-2">
            <ButtonGenerateImage 
            loading={loading} 
            setLoading={setLoading} 
            setImageUrl={setImageUrl}
            prompt={prompt}
          />
          </div>
        </div>
      </div>

      {/* Botón de publicar en Medium */}
      <div className="mt-4">
            <ButtonMedium response={response} />
      </div>
    </div>
  );
}

export default App;
