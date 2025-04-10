import React from "react";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
});

function ButtonGenerateImage ({loading, setLoading, setImageUrl, prompt}) {

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