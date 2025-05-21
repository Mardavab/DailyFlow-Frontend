import { useContext } from "react";
import { SaleRow } from "./SaleRow";
import { SalesContext } from "../../context/sales/SalesContext";

export const SaleList = () => {
  const { sales = [] } = useContext(SalesContext);

  return (
    <>
      <table
        className="table table-bordered"
        id="dataTableSales"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Monto</th>
            <th>Método de Pago</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Productos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>ID</th>
            <th>Monto</th>
            <th>Método de Pago</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Productos</th>
            <th>Acciones</th>
          </tr>
        </tfoot>
        <tbody>
          {sales.map((sale) => (
            <SaleRow key={sale.id} sale={sale} />
          ))}
        </tbody>
      </table>
    </>
  );
};
