// src/hooks/useAuth.js
import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducers";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  user: undefined,
};

export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navigate = useNavigate();

  const handlerLogin = async (credentials) => {
    try {
      const user = await loginUser(credentials);
      dispatch({ type: "login", payload: user });
      sessionStorage.setItem(
        "login",
        JSON.stringify({ isAuth: true, user })
      );
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      Swal.fire("Error de login", "Usuario o contraseña inválidos", "error");
    }
  };

  const handlerLogout = () => {
    dispatch({ type: "logout" });
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("token");
  };

  return { login, handlerLogin, handlerLogout };
};
