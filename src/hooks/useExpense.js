import Swal from "sweetalert2";
import { expenseReducer } from "../reducers/expenseReducer";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const initialExpenseForm = {
  id: 0,
  concepto: "",
  monto: "",
  fecha: "",    // formato "yyyy-MM-dd"
  hora: "",     // formato "HH:mm:ss"
};

export const useExpense = () => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);
  const [expenseSelected, setExpenseSelected] = useState(initialExpenseForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  // 1) Cargar lista de gastos desde el backend
  useEffect(() => {
    api
      .get("/expense")
      .then(({ data }) => {
        dispatch({ type: "loadExpenses", payload: data });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar los gastos", "error");
      });
  }, []);

  // 2) Crear o actualizar gasto
  const handlerAddExpense = async (expense) => {
    try {
      let res;
      if (!expense.id || expense.id === 0) {
        // POST (crear): quitar id antes de enviar
        const { id, ...payload } = expense;
        res = await api.post("/expense", payload);
        dispatch({ type: "addExpense", payload: res.data });
        Swal.fire("Gasto creado", "El gasto ha sido creado con éxito.", "success");
      } else {
        // PUT (actualizar)
        res = await api.put(`/expense/${expense.id}`, expense);
        dispatch({ type: "updateExpense", payload: res.data });
        Swal.fire("Gasto actualizado", "El gasto ha sido actualizado con éxito.", "success");
      }
      handlerCloseForm();
      navigate("/expenses"); // Cambia la ruta si tu app navega distinto
    } catch (err) {
      console.error(err);
      let msg = "No se pudo guardar el gasto";
      if (err.response?.status === 409) msg = "El gasto ya existe";
      Swal.fire("Error", msg, "error");
    }
  };

  // 3) Eliminar gasto
  const handlerRemoveExpense = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/expense/${id}`);
          dispatch({ type: "removeExpense", payload: id });
          Swal.fire("¡Eliminado!", "El gasto ha sido eliminado.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo eliminar el gasto", "error");
        }
      }
    });
  };

  // 4) Abrir formulario en modo edición
  const handlerSelectExpenseForm = (expense) => {
    setExpenseSelected({ ...expense });
    setVisibleForm(true);
  };

  // 5) Control de visibilidad del form
  const handlerOpenForm = () => setVisibleForm(true);
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setExpenseSelected(initialExpenseForm);
  };

  return {
    expenses,
    expenseSelected,
    initialExpenseForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddExpense,
    handlerRemoveExpense,
    handlerSelectExpenseForm,
  };
};
