import React from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function ButtonGenerateArticle ({loading, setResponse, setLoading, prompt}) {

  const handleGenerateArticle = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("Generando artículo...");

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log("text", text)
      setResponse(text);
    } catch (error) {
      console.error("Error al generar:", error);
      setResponse("Error al generar el artículo.");
    } finally {
      setLoading(false);
    }

    // setPrompt("");
  };

  return (
    <>
    <button
              className="btn btn-primary"
              onClick={handleGenerateArticle}
              disabled={loading}
            >
              {loading ? "Generando..." : "Artículo generado"}
            </button>
    </>
  )
}

export default ButtonGenerateArticle;