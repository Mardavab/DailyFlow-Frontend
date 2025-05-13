import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../../context/expense/ExpenseContext";

export const ExpenseForm = ({ handlerCloseForm, expenseSelected }) => {
  const { handlerAddExpense, initialExpenseForm } = useContext(ExpenseContext);
  const [expenseForm, setExpenseForm] = useState(initialExpenseForm);
  const { id, amount, category, description, date, time } = expenseForm; // Updated property names

  useEffect(() => {
    setExpenseForm({
      ...expenseSelected,
    });
  }, [expenseSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setExpenseForm({
      ...expenseForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!amount || !category || !date || !time) { // Updated property names
      alert("Debe completar todos los campos obligatorios");
      return;
    }

    handlerAddExpense(expenseForm);
    setExpenseForm(initialExpenseForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setExpenseForm(initialExpenseForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="number"
        className="form-control my-3 w-75"
        placeholder="Monto"
        name="amount"
        value={amount || ""}
        onChange={onInputChange}
        step="0.01"
        min="0"
        required
      />

      <select
        className="form-control my-3 w-75"
        name="category"
        value={category || ""}
        onChange={onInputChange}
        required
      >
        <option value="">Seleccione categoría</option>
        <option value="Alimentos">Alimentos</option>
        <option value="Transporte">Transporte</option>
        <option value="Servicios">Servicios</option>
        <option value="Oficina">Oficina</option>
        <option value="Otros">Otros</option>
      </select>

      <textarea
        className="form-control my-3 w-75"
        placeholder="Descripción"
        name="description"
        value={description || ""}
        onChange={onInputChange}
        rows="3"
      />

      <input
        type="date"
        className="form-control my-3 w-75"
        name="date"
        value={date || ""}
        onChange={onInputChange}
        required
      />

      <input
        type="time"
        className="form-control my-3 w-75"
        name="time"
        value={time || ""}
        onChange={onInputChange}
        required
      />

      <input type="hidden" name="id" value={id} />

      <button className="btn btn-primary" type="submit">
        {id > 0 ? "Actualizar" : "Registrar"}
      </button>

      {!handlerCloseForm || (
        <button
          onClick={onCloseForm}
          type="button"
          className="btn-primary btn mx-2"
        >
          Cerrar
        </button>
      )}
    </form>
  );
};