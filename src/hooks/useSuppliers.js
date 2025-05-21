import Swal from "sweetalert2";
import { suppliersReducer } from "../reducers/suppliersReducer ";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const initialSupplierForm = {
  id: 0,
  nombre: '',
  contactPerson: '',
  phone: '',
  email: '',
  address: ''
};

export const useSuppliers = () => {
  const [suppliers, dispatch] = useReducer(suppliersReducer, []);
  const [supplierSelected, setSupplierSelected] = useState(initialSupplierForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  // 1) Cargar la lista de proveedores desde el backend
  useEffect(() => {
    api
      .get("/suppliers")
      .then(({ data }) => {
        dispatch({ type: "loadSuppliers", payload: data });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar los proveedores", "error");
      });
  }, []);

  // 2) Crear o actualizar proveedor
  const handlerAddSupplier = async (supplier) => {
    try {
      let res;
      if (!supplier.id || supplier.id === 0) {
        // POST (crear): quitar id antes de enviar
        const { id, ...payload } = supplier;
        res = await api.post("/suppliers", payload);
        dispatch({ type: "addSupplier", payload: res.data });
        Swal.fire("Proveedor creado", "El proveedor ha sido creado con éxito.", "success");
      } else {
        // PUT (actualizar)
        res = await api.put(`/suppliers/${supplier.id}`, supplier);
        dispatch({ type: "updateSupplier", payload: res.data });
        Swal.fire("Proveedor actualizado", "El proveedor ha sido actualizado con éxito.", "success");
      }
      handlerCloseForm();
      navigate("/purchases/suppliers"); // Cambia la ruta si tu app navega distinto
    } catch (err) {
      console.error(err);
      let msg = "No se pudo guardar el proveedor";
      if (err.response?.status === 409) msg = "El proveedor o email ya existe";
      Swal.fire("Error", msg, "error");
    }
  };

  // 3) Eliminar proveedor
  const handlerRemoveSupplier = (id) => {
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
          await api.delete(`/suppliers/${id}`);
          dispatch({ type: "removeSupplier", payload: id });
          Swal.fire("¡Eliminado!", "El proveedor ha sido eliminado.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo eliminar el proveedor", "error");
        }
      }
    });
  };

  // 4) Abrir formulario en modo edición
  const handlerSelectSupplierForm = (supplier) => {
    setSupplierSelected({ ...supplier });
    setVisibleForm(true);
  };

  // 5) Control de visibilidad del form
  const handlerOpenForm = () => setVisibleForm(true);
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setSupplierSelected(initialSupplierForm);
  };

  return {
    suppliers,
    supplierSelected,
    initialSupplierForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddSupplier,
    handlerRemoveSupplier,
    handlerSelectSupplierForm,
  };
};
