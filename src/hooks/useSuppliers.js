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
  //tipoProveedor: '',
};

export const useSuppliers = () => {
  const [suppliers, dispatch] = useReducer(suppliersReducer, []);
  const [supplierSelected, setSupplierSelected] = useState(initialSupplierForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

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
      if (supplier.id === 0) {
        const { id, ...payload } = supplier;
        res = await api.post("/suppliers", payload);
        dispatch({ type: "addSupplier", payload: res.data });
        Swal.fire("Proveedor Registrado", "El proveedor ha sido registrado con éxito!", "success");
      } else {
        res = await api.put(`/suppliers/${supplier.id}`, supplier);
        dispatch({ type: "updateSupplier", payload: res.data });
        Swal.fire("Proveedor Actualizado", "El proveedor ha sido actualizado con éxito!", "success");
      }
      handlerCloseForm();
      navigate("/purchases/suppliers");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo guardar el proveedor", "error");
    }
  };

  const handlerRemoveSupplier = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
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

  const handlerSelectSupplierForm = (supplier) => {
    setSupplierSelected({ ...supplier });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

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