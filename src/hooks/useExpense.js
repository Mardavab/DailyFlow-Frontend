import Swal from "sweetalert2";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { expenseReducer } from "../reducers/expenseReducer";
import api from "../api/api";


const initialExpenseForm = {
  id: 0,
  amount: 0,
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
};

export const useExpense = () => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);
  const [expenseSelected, setExpenseSelected] = useState(initialExpenseForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

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


  const handlerAddExpense = async (expense) => {
    try {
      let res;
      if (expense.id === 0) {
        const { id, ...payload } = expense;
        res = await api.post("/expense", payload);
        dispatch({ type: "addExpense", payload: res.data });
        Swal.fire("Gasto Registrado", "El gasto ha sido registrado con éxito!", "success");
      } else {
        res = await api.put(`/expense/${expense.id}`, expense);
        dispatch({ type: "updateExpense", payload: res.data });
        Swal.fire("Gasto Actualizado", "El gasto ha sido actualizado con éxito!", "success");
      }
      handlerCloseForm();
      navigate("/expenses");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo registrar el gasto", "error");
    }
  };

  const handlerRemoveExpense = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
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

  const handlerSelectExpenseForm = (expense) => {
    setExpenseSelected({ ...expense });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };
  
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