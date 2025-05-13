import Swal from "sweetalert2";
import { productsReducer } from "../reducers/productsReducer";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialProducts = [
  {
    id: 1,
    nombre: 'Laptop HP EliteBook',
    precio: 1299.99,
    stock: 15,
    categoria: 'Tecnología',
    fechaCreacion: '2023-01-10'
  },
  {
    id: 2,
    nombre: 'Smartphone Samsung Galaxy S23',
    precio: 899.99,
    stock: 32,
    categoria: 'Tecnología',
    fechaCreacion: '2023-02-05'
  },
  {
    id: 3,
    nombre: 'Silla Ergonómica',
    precio: 249.99,
    stock: 8,
    categoria: 'Muebles',
    fechaCreacion: '2023-03-15'
  }
];

const initialProductForm = {
  id: 0,
  nombre: '',
  precio: 0,
  stock: 0,
  categoria: '',
  fechaCreacion: new Date().toISOString().split('T')[0]
};

export const useProducts = () => {
  const [products, dispatch] = useReducer(productsReducer, initialProducts);
  const [productSelected, setProductSelected] = useState(initialProductForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const handlerAddProduct = (product) => {
    dispatch({
      type: product.id === 0 ? "addProduct" : "updateProduct",
      payload: product,
    });
    
    Swal.fire({
      title: product.id === 0 ? "Producto Creado" : "Producto Actualizado",
      text: product.id === 0 
        ? "El producto ha sido creado con éxito!" 
        : "El producto ha sido actualizado con éxito!",
      icon: "success",
    });
    
    handlerCloseForm();
    navigate('/inventory');
  };

  const handlerRemoveProduct = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "removeProduct",
          payload: id,
        });
        Swal.fire({
          title: "¡Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const handlerSelectProduct = (product) => {
    setProductSelected({ ...product });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setProductSelected(initialProductForm);
  };

  return {
    products,
    productSelected,
    initialProductForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddProduct,
    handlerRemoveProduct,
    handlerSelectProduct,
  };
};