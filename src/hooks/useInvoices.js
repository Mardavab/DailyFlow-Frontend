import { useReducer, useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../api/api";
import { invoicesReducer } from "../reducers/invoicesReducer";
import { useNavigate } from "react-router-dom";

const initialInvoiceForm = {
  id: 0,
  invoiceNumber: "",
  issueDate: "",
  dueDate: "",
  supplierId: "",
  items: [],
  status: "PENDIENTE",
  total: 0,
  pendingBalance: 0,
  payments: [],
};

export const useInvoices = () => {
  const [invoices, dispatch] = useReducer(invoicesReducer, []);
  const [invoiceSelected, setInvoiceSelected] = useState(initialInvoiceForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  // Cargar facturas al montar
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data } = await api.get("/invoices");
      dispatch({ type: "loadInvoices", payload: data });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar las facturas", "error");
    }
  };

  // Crear o actualizar factura
  const handlerAddInvoice = async (invoice) => {
    try {
      const payload = {
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        supplierId: invoice.supplierId,
        items: invoice.items.map(item => ({
          description: item.description,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
      };

      let res;
      if (!invoice.id || invoice.id === 0) {
        res = await api.post("/invoices", payload);
        // Alternativa 1: Agregar al estado local
        dispatch({ type: "addInvoice", payload: res.data });
        // Alternativa 2: Refrescar desde backend (recomendado si hay lógica de backend sobre totales)
        await fetchInvoices();
        Swal.fire("Factura creada", "La factura ha sido registrada.", "success");
      } else {
        res = await api.put(`/invoices/${invoice.id}`, payload);
        dispatch({ type: "updateInvoice", payload: res.data });
        await fetchInvoices();
        Swal.fire("Factura actualizada", "La factura ha sido actualizada.", "success");
      }
      handlerCloseForm(); // <-- Cierra el modal después de actualizar
      navigate("/purchases/invoices");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo guardar la factura", "error");
    }
  };

  // Eliminar factura
  const handlerRemoveInvoice = (id) => {
    Swal.fire({
      title: "¿Eliminar factura?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/invoices/${id}`);
          // Alternativa: refresca desde backend
          await fetchInvoices();
          // dispatch({ type: "removeInvoice", payload: id });
          Swal.fire("Eliminada", "La factura ha sido eliminada.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo eliminar la factura", "error");
        }
      }
    });
  };

  // Agregar un pago a una factura
  const handlerAddPayment = async (invoiceId, payment) => {
    try {
      const payload = {
        date: payment.date,
        amount: Number(payment.amount),
        method: payment.method,
      };
      await api.post(`/invoices/${invoiceId}/payments`, payload);
      await fetchInvoices();
      Swal.fire("Pago registrado", "El pago ha sido registrado.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo registrar el pago", "error");
    }
  };

  // Abrir y cerrar form
  const handlerOpenForm = () => setVisibleForm(true);
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setInvoiceSelected(initialInvoiceForm);
  };

  const handlerSelectInvoiceForm = (invoice) => {
    setInvoiceSelected({ ...invoice });
    setVisibleForm(true);
  };

  return {
    invoices,
    invoiceSelected,
    initialInvoiceForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddInvoice,
    handlerRemoveInvoice,
    handlerSelectInvoiceForm,
    handlerAddPayment,
  };
};
