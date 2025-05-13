import { useContext } from "react";
import { ProductList } from "./ProductList";
import { ProductContext } from "../../context/Product/ProductContext";
import { ProductModalForm } from "./ProductModalForm";


export const ProductsContent = () => {
  const {
    products,
    visibleForm,
    handlerOpenForm,
    handlerRemoveProduct,
    handlerSelectProduct,
  } = useContext(ProductContext);

  return (
    <>
      {visibleForm && <ProductModalForm />}
      
      <div className="container-fluid">
        {/* Encabezado */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

        {/* Tabla de Productos */}
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 m-0 font-weight-bold text-primary">
              Gestión de Productos
            </h1>
            <button onClick={handlerOpenForm} className="btn btn-success btn-circle">
              <i className="fas fa-plus"></i>
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {products.length === 0 ? (
                <div className="alert alert-warning">
                  No hay productos en el inventario
                </div>
              ) : (
                <ProductList />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};