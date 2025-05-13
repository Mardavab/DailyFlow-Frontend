import Swal from "sweetalert2";
import { invoicesReducer } from "../reducers/invoicesReducer";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuppliers } from "./useSuppliers";

const initialInvoices = [
  {
    id: 1,
    numeroFactura: "FAC-001",
    proveedorId: 1,
    fechaEmision: "2023-01-15",
    fechaVencimiento: "2023-02-15",
    total: 1500.0,
    estado: "pendiente",
    pagos: [],
    saldoPendiente: 1500.0,
    items: [
      {
        id: 1,
        descripcion: "Materiales de oficina",
        cantidad: 5,
        precioUnitario: 100.0,
      },
      {
        id: 2,
        descripcion: "Servicios técnicos",
        cantidad: 10,
        precioUnitario: 100.0,
      },
    ],
  },
  {
    id: 2,
    numeroFactura: "FAC-002",
    proveedorId: 2,
    fechaEmision: "2023-02-20",
    fechaVencimiento: "2023-03-20",
    total: 2500.5,
    estado: "pagado",
    pagos: [
      {
        id: "p1",
        fecha: "2023-02-25",
        monto: 2500.5,
        metodo: "transferencia",
        Referencia: "No23123",
      },
    ],
    saldoPendiente: 0,
    items: [
      {
        id: 1,
        descripcion: "Equipos electrónicos",
        cantidad: 2,
        precioUnitario: 1000.0,
      },
    ],
  },
];

const initialInvoiceForm = {
  id: 0,
  numeroFactura: "",
  proveedorId: "",
  fechaEmision: new Date().toISOString().split("T")[0],
  fechaVencimiento: "",
  estado: "pendiente",
  total: 0,
  items: [],
};

export const useInvoices = () => {
  const [invoices, dispatch] = useReducer(invoicesReducer, initialInvoices);
  const [invoiceSelected, setInvoiceSelected] = useState(initialInvoiceForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();
  const { suppliers } = useSuppliers();
  

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.cantidad * item.precioUnitario;
    }, 0);
  };

  const handlerAddInvoice = (invoice) => {
    const invoiceWithTotal = {
      ...invoice,
      total: calculateTotal(invoice.items),
      saldoPendiente: calculateTotal(invoice.items),
      pagos: [],
    };

    dispatch({
      type: invoice.id === 0 ? "addInvoice" : "updateInvoice",
      payload: invoiceWithTotal,
    });

    Swal.fire({
      title: invoice.id === 0 ? "Factura Creada" : "Factura Actualizada",
      text:
        invoice.id === 0
          ? "La factura ha sido creada con éxito!"
          : "La factura ha sido actualizada con éxito!",
      icon: "success",
    });
    handlerCloseForm();
    navigate("/purchases/invoices");
  };

  const handlerRemoveInvoice = (id) => {
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
          type: "removeInvoice",
          payload: id,
        });
        Swal.fire({
          title: "¡Eliminada!",
          text: "La factura ha sido eliminada.",
          icon: "success",
        });
      }
    });
  };

  const handlerSelectInvoiceForm = (invoice) => {
    setInvoiceSelected({
      ...invoice,
      items: invoice.items.map((item) => ({
        id: item.id || Math.random().toString(36).substr(2, 9),
        ...item,
      })),
    });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setInvoiceSelected(initialInvoiceForm);
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setInvoiceSelected(initialInvoiceForm);
  };

  const handlerAddItem = (item) => {
    setInvoiceSelected((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          ...item,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    }));
  };

  const handlerRemoveItem = (itemId) => {
    setInvoiceSelected((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const getInvoicePayments = (invoiceId) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    return invoice ? invoice.pagos : [];
  };

  const validatePayment = (invoiceId, pago) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);

    if (!invoice) {
      return { valid: false, message: "Factura no encontrada" };
    }

    if (pago.monto <= 0) {
      return { valid: false, message: "El monto debe ser mayor a cero" };
    }

    if (invoice.estado === "pagado") {
      return {
        valid: false,
        message: "La factura ya está completamente pagada",
      };
    }

    if (pago.monto > invoice.saldoPendiente) {
      return { valid: false, message: "El monto excede el saldo pendiente" };
    }

    if (!pago.metodo || pago.metodo.trim() === "") {
      return { valid: false, message: "Debe especificar un método de pago" };
    }

    return { valid: true };
  };

  const handlerAddPayment = (invoiceId, pago) => {
    const validation = validatePayment(invoiceId, pago);
    if (!validation.valid) {
      Swal.fire("Error", validation.message, "error");
      return;
    }

    const invoice = invoices.find((inv) => inv.id === invoiceId);
    const newPayment = {
      id: Math.random().toString(36).substr(2, 9),
      fecha: new Date().toISOString().split("T")[0],
      monto: pago.monto,
      metodo: pago.metodo,
      referencia: pago.referencia || "",
    };

    const nuevoSaldo = invoice.saldoPendiente - pago.monto;
    let nuevoEstado = invoice.estado;

    if (nuevoSaldo === 0) {
      nuevoEstado = "pagado";
    } else if (nuevoSaldo < invoice.saldoPendiente) {
      nuevoEstado = "parcial";
    }

    dispatch({
      type: "addPayment",
      payload: {
        invoiceId,
        pago: newPayment,
        nuevoSaldo,
        nuevoEstado,
      },
    });

    Swal.fire(
      "Pago Registrado",
      "El pago se ha registrado correctamente",
      "success"
    );
  };

  return {
    invoices,
    invoiceSelected,
    initialInvoiceForm,
    visibleForm,
    suppliers,

    getInvoicePayments,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddInvoice,
    handlerRemoveInvoice,
    handlerSelectInvoiceForm,
    handlerAddItem,
    handlerRemoveItem,
    handlerAddPayment,
  };
};
