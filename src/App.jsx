import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">AInscribe</h1>

        <div className="d-flex" style={{ gap: "20px" }}>
          {/* Izquierda: Resultado (70%) */}
          <div style={{ width: "70%" }}>
            <div
              className="border p-3 rounded bg-light"
              style={{ minHeight: "300px" }}
            >
              <p className="mb-0 text-muted">
                Generated article will appear here...
              </p>
            </div>
          </div>

          {/* Derecha: Input y botón (30%) */}
          <div style={{ width: "30%" }}>
            <div className="mb-3">
              <label htmlFor="inputPrompt" className="form-label">
                Write your idea
              </label>
              <textarea
                id="inputPrompt"
                className="form-control"
                rows="8"
                placeholder="Type your idea here..."
              ></textarea>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary">Generate article</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
