import Swal from "sweetalert2";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { salesReducer } from "../reducers/salesReducers";

const initialSales = [
  {
    id: 1,
    monto: 1000.00,
    metodoPago: 'Efectivo',
    fecha: '2023-05-15',
    hora: '14:30'
  },
  {
    id: 2,
    monto: 2500.50,
    metodoPago: 'Tarjeta de crédito',
    fecha: '2023-05-16',
    hora: '10:15'
  },
  {
    id: 3,
    monto: 1800.75,
    metodoPago: 'Transferencia bancaria',
    fecha: '2023-05-17',
    hora: '16:45'
  }
];

const initialSaleForm = {
  id: 0,
  monto: 0,
  metodoPago: '',
  fecha: new Date().toISOString().split('T')[0],
  hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const useSales = () => {
  const [sales, dispatch] = useReducer(salesReducer, initialSales);
  const [saleSelected, setSaleSelected] = useState(initialSaleForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const handlerAddSale = (sale) => {
    dispatch({
      type: sale.id === 0 ? "addSale" : "updateSale",
      payload: sale,
    });
    Swal.fire({
      title: sale.id === 0 ? "Venta Registrada" : "Venta Actualizada",
      text:
        sale.id === 0
          ? "La venta ha sido registrada con éxito!"
          : "La venta ha sido actualizada con éxito!",
      icon: "success",
    });
    handlerCloseForm();
    navigate('/sales')
  };

  const handlerRemoveSale = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínala!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "removeSale",
          payload: id,
        });
        Swal.fire({
          title: "¡Eliminada!",
          text: "La venta ha sido eliminada.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const handlerSelectSaleForm = (sale) => {
    setSaleSelected({ ...sale });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };
  
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setSaleSelected(initialSaleForm);
  };

  return {
    sales,
    saleSelected,
    initialSaleForm,
    visibleForm,

    handlerOpenForm,
    handlerCloseForm,
    handlerAddSale,
    handlerRemoveSale,
    handlerSelectSaleForm,
  };
};