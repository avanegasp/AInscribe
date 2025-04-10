import React from "react";

function ButtonMedium({response}) {

  // const [response, setResponse] = useState("");

    console.log("response here", response)

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

  return (
    <>
      <button
        className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
        onClick={handlePublishToMedium}
      >
        <i className="fab fa-medium-m me-2"></i> Publicar en Medium
      </button>
    </>
  );
}

export default ButtonMedium;
