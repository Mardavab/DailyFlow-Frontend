import Swal from "sweetalert2";
import { productsReducer } from "../reducers/productsReducer";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const initialProductForm = {
  id: 0,
  name: '',
  price: '',
  stock: '',
};

export const useProducts = () => {
  const [products, dispatch] = useReducer(productsReducer, []);
  const [productSelected, setProductSelected] = useState(initialProductForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  // ✅ Función reutilizable para traer los productos del backend
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/product");
      dispatch({ type: "loadProducts", payload: data });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    }
  };

  // 1) Cargar la lista de productos desde el backend
  useEffect(() => {
    fetchProducts();
    console.log("actualizo");
    
  }, []);

  // 2) Crear o actualizar producto
  const handlerAddProduct = async (product) => {
    try {
      let res;
      if (!product.id || product.id === 0) {
        // POST (crear)
        const { id, ...payload } = product;
        res = await api.post("/product", payload);
        dispatch({ type: "addProduct", payload: res.data });
        Swal.fire("Producto creado", "El producto ha sido creado con éxito.", "success");
      } else {
        // PUT (actualizar)
        res = await api.put(`/product/${product.id}`, product);
        dispatch({ type: "updateProduct", payload: res.data });
        Swal.fire("Producto actualizado", "El producto ha sido actualizado con éxito.", "success");
      }
      handlerCloseForm();
      navigate("/inventory");
    } catch (err) {
      console.error(err);
      let msg = "No se pudo guardar el producto";
      if (err.response?.status === 409) msg = "El producto ya existe";
      Swal.fire("Error", msg, "error");
    }
  };

  // 3) Eliminar producto
  const handlerRemoveProduct = (id) => {
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
          await api.delete(`/product/${id}`);
          dispatch({ type: "removeProduct", payload: id });
          Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo eliminar el producto", "error");
        }
      }
    });
  };

  // 4) Abrir formulario en modo edición
  const handlerSelectProduct = (product) => {
    setProductSelected({ ...product });
    setVisibleForm(true);
  };

  // 5) Control de visibilidad del form
  const handlerOpenForm = () => setVisibleForm(true);
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
    fetchProducts, // 👈 ahora puedes llamarlo desde otros componentes
  };
};
