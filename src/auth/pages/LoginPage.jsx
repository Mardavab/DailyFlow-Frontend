import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {
    username: '',
    password: ''
}

export const LoginPage = () => {
  const { handlerLogin } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      Swal.fire('Error de validación', 'Usuario y contraseña requeridos', 'error');
      return;
    }
    
    if (typeof handlerLogin === 'function') {
      handlerLogin({ username, password });
    } else {
      console.error('handlerLogin no es una función');
    }

    setLoginForm(initialLoginForm);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-8 col-md-10">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Inicio de Sesión</h1>
                </div>
                <form className="user" onSubmit={onSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-user"
                      name="username"
                      placeholder="Usuario"
                      value={username}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="password" 
                      className="form-control form-control-user"
                      name="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-user btn-block">
                    Ingresar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};