import Swal from "sweetalert2";
import { salesReducer } from "../reducers/salesReducers";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const initialSaleForm = {
  id: 0,
  paymentMethod: "",
  items: [
    // { productId: null, quantity: 1 }
  ],
};

export const useSales = () => {
  const [sales, dispatch] = useReducer(salesReducer, []);
  const [saleSelected, setSaleSelected] = useState(initialSaleForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  // 1) Cargar lista de ventas desde el backend
  useEffect(() => {
    api
      .get("/sales")
      .then(({ data }) => {
        dispatch({ type: "loadSales", payload: data });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar las ventas", "error");
      });
  }, []);

  // 2) Crear o actualizar venta
  const handlerAddSale = async (sale) => {
    try {
      let res;
      const payload = {
        paymentMethod: sale.paymentMethod,
        items: sale.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      if (!sale.id || sale.id === 0) {
        res = await api.post("/sales", payload);
        dispatch({ type: "addSale", payload: res.data });
        Swal.fire("Venta registrada", "La venta ha sido registrada con éxito.", "success");
      } else {
        res = await api.put(`/sales/${sale.id}`, payload);
        dispatch({ type: "updateSale", payload: res.data });
        Swal.fire("Venta actualizada", "La venta ha sido actualizada con éxito.", "success");
      }
      handlerCloseForm();
      navigate("/sales"); // Cambia la ruta si tu app navega distinto
    } catch (err) {
      console.error(err);
      let msg = "No se pudo registrar la venta";
      if (err.response?.status === 409) msg = "La venta ya existe";
      Swal.fire("Error", msg, "error");
    }
  };

  // 3) Eliminar venta
  const handlerRemoveSale = (id) => {
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
          await api.delete(`/sales/${id}`);
          dispatch({ type: "removeSale", payload: id });
          Swal.fire("¡Eliminado!", "La venta ha sido eliminada.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo eliminar la venta", "error");
        }
      }
    });
  };

  // 4) Abrir formulario en modo edición
  const handlerSelectSaleForm = (sale) => {
    setSaleSelected({ ...sale });
    setVisibleForm(true);
  };

  // 5) Control de visibilidad del form
  const handlerOpenForm = () => setVisibleForm(true);
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
