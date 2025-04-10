import React from "react";

function ButtonGenerateImage({ loading, setLoading, setImageUrl, prompt }) {

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageUrl("");

    console.log("Enviando prompt al backend:", prompt);

    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Respuesta no OK del backend");
      }

      const data = await response.json()
      console.log("Respuesta del backend:", data);

      if (data && data.output && Array.isArray(data.output)) {
        setImageUrl(data.output[0]);
      } else {
        console.error("Formato inesperado:", data);
        alert("No se pudo obtener la imagen.");
      }
    } catch (error) {
      console.error("ERROR DETALLADO:", error.message || error);
      alert("Error al generar imagen: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <button
        className="btn btn-outline-success"
        onClick={handleGenerateImage}
        disabled={loading}
      >
        🖼️ Generar imagen
      </button>
    </>
  )
}

export default ButtonGenerateImage