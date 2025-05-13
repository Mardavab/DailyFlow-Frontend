import Swal from "sweetalert2";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { expenseReducer } from "../reducers/expenseReducer";

const initialExpenses = [
  {
    id: 1,
    amount: 500.00,
    category: 'Oficina',
    description: 'Materiales de papelería',
    date: '2023-05-15',
    time: '09:30'
  },
  {
    id: 2,
    amount: 1200.50,
    category: 'Servicios',
    description: 'Factura de internet',
    date: '2023-05-16',
    time: '11:15'
  },
  {
    id: 3,
    amount: 750.25,
    category: 'Transporte',
    description: 'Combustible para vehículo',
    date: '2023-05-17',
    time: '15:45'
  }
];

const initialExpenseForm = {
  id: 0,
  amount: 0,
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const useExpense = () => {
  const [expenses, dispatch] = useReducer(expenseReducer, initialExpenses);
  const [expenseSelected, setExpenseSelected] = useState(initialExpenseForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const handlerAddExpense = (expense) => {
    dispatch({
      type: expense.id === 0 ? "addExpense" : "updateExpense",
      payload: expense,
    });
    Swal.fire({
      title: expense.id === 0 ? "Gasto Registrado" : "Gasto Actualizado",
      text:
        expense.id === 0
          ? "El gasto ha sido registrado con éxito!"
          : "El gasto ha sido actualizado con éxito!",
      icon: "success",
    });
    handlerCloseForm();
    navigate('/expenses')
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "removeExpense",
          payload: id,
        });
        Swal.fire({
          title: "¡Eliminado!",
          text: "El gasto ha sido eliminado.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
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