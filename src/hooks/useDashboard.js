import { useState, useEffect } from "react";
import api from "../api/api"; // Asegúrate que apunte a tu axios instancia con JWT

export const useDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get("/dashboard/summary")
      .then(({ data }) => setSummary(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { summary, loading, error };
};
