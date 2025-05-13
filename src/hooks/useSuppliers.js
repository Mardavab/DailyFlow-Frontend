import Swal from "sweetalert2";
import { suppliersReducer } from "../reducers/suppliersReducer ";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialSuppliers = [
  {
    id: 1,
    nombre: 'Distribuidora ACME',
    contacto: 'Juan Pérez',
    telefono: '555-123-4567',
    email: 'contacto@acme.com',
    direccion: 'Av. Principal 123',
    tipoProveedor: 'Materiales',
    fechaRegistro: '2023-01-15'
  },
  {
    id: 2,
    nombre: 'Servicios Técnicos SA',
    contacto: 'María García',
    telefono: '555-987-6543',
    email: 'servicios@tecnica.com',
    direccion: 'Calle Secundaria 456',
    tipoProveedor: 'Servicios',
    fechaRegistro: '2023-02-20'
  }
];

const initialSupplierForm = {
  id: 0,
  nombre: '',
  contacto: '',
  telefono: '',
  email: '',
  direccion: '',
  tipoProveedor: '',
  fechaRegistro: new Date().toISOString().split('T')[0]
};

export const useSuppliers = () => {
  const [suppliers, dispatch] = useReducer(suppliersReducer, initialSuppliers);
  const [supplierSelected, setSupplierSelected] = useState(initialSupplierForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const handlerAddSupplier = (supplier) => {
    dispatch({
      type: supplier.id === 0 ? "addSupplier" : "updateSupplier",
      payload: supplier,
    });
    Swal.fire({
      title: supplier.id === 0 ? "Proveedor Registrado" : "Proveedor Actualizado",
      text: supplier.id === 0 
        ? "El proveedor ha sido registrado con éxito!" 
        : "El proveedor ha sido actualizado con éxito!",
      icon: "success",
    });
    handlerCloseForm();
    navigate('/purchases/suppliers');
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "removeSupplier",
          payload: id,
        });
        Swal.fire({
          title: "¡Eliminado!",
          text: "El proveedor ha sido eliminado.",
          icon: "success",
        });
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