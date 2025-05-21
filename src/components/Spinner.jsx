// src/components/Spinner.jsx
export const Spinner = ({ message = "Cargando..." }) => (
  <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "150px" }}>
    <div className="spinner-border text-primary mb-2" role="status" style={{ width: "3rem", height: "3rem" }}>
      <span className="sr-only">{message}</span>
    </div>
    <span>{message}</span>
  </div>
);
