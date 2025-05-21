import { useState, useEffect } from "react";
import api from "../api/api";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    api.get("/roles")
      .then(({ data }) => setRoles(data))
      .catch(() => setRoles([]));
  }, []);

  return roles;
};
