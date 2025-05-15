import Swal from "sweetalert2";
import { productsReducer } from "../reducers/productsReducer";
import { useReducer, useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";



const initialProductForm = {
  id: 0,
  name: '',
  price: 0,
  stock: 0,
  categoria: '',
  size: ''
  
};

export const useProducts = () => {
  const [products, dispatch] = useReducer(productsReducer, []);
  const [productSelected, setProductSelected] = useState(initialProductForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/product")
      .then(({ data }) => {
        dispatch({ type: "loadProducts", payload: data });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar los Productos", "error");
      });
  }, []);

  const handlerAddProduct = async (product) => {
    try {
      let res;
      if (product.id === 0) {
        const { id, ...payload } = product;
        res = await api.post("/product", payload);
        dispatch({ type: "addProduct", payload: res.data });
        Swal.fire("Producto Creado", "El Producto ha sido creado con éxito!", "success");
      } else {
        res = await api.put(`/product/${product.id}`, product);
        dispatch({ type: "updateProduct", payload: res.data });
        Swal.fire("Producto Actualizado", "El Producto ha sido actualizado con éxito!", "success");
      }
      handlerCloseForm();
      navigate("/inventory");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo guardar el Producto", "error");
    }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/product/${id}`);
          dispatch({ type: "removeProduct", payload: id });
          Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo eliminar el Producto", "error");
        }
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