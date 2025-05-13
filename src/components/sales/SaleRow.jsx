import { useContext } from "react";
import { SalesContext } from "../../context/sales/SalesContext";

export const SaleRow = ({ sale }) => {
  const { handlerSelectSaleForm, handlerRemoveSale } = useContext(SalesContext);

  return (
    <tr key={sale.id}>
      <td>{sale.id}</td>
      <td>
        $
        {sale.monto.toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td>{sale.metodoPago}</td>
      <td>{sale.fecha}</td>
      <td>{sale.hora}</td>
      <td>
        <div style={{ display: "inline-block" }}>
          <button
            type="button"
            className="btn btn-info btn-circle"
            onClick={() => {handlerSelectSaleForm(sale)
                console.log(sale);
                
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
        <div style={{ display: "inline-block", marginLeft: "5px" }}>
          <button
            type="button"
            className="btn btn-danger btn-circle"
            onClick={() => handlerRemoveSale(sale.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};
